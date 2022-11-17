import React, { useEffect, useState } from "react";
import { Slidebar } from "../components/Slidebar";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


import axios from "axios";

export const MyTicket = () => {
  const Token = JSON.parse(sessionStorage.getItem("token"));
  const { email, } = useSelector((state) => state.user);
  const [tickets, setTickets] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    GetTicket()
    getToken()
  }, []);

  function getToken(err) {
    try {
      const tokenString = sessionStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      jwtDecode(userToken);
    } catch (error) {
      history("/login");
    }
  }


  const AddHandler = () =>{
    history('/ticket/add')
  }


  const GetTicket = async () => {
    const response = await axios.get(
      `http://localhost:3001/ticket/myticket/${email}`,
      {
        headers: {
          Authorization: `bearer ${Token}`,
        },
      }
    );
    setTickets(response.data.data);
  };


  console.log(tickets);
  return (
    <div className="container is-fluid">
      <div className="columns">
        <Slidebar />
        <div className="column">
          <section className="hero is-info welcome ">
            <div className="hero-body">
              <div className="container is-fluid">
                <h1 className="title">My Tickets</h1>
              </div>
            </div>
          </section>
          <div className="container">
          <br/>
          <button className="button is-medium is-success" onClick={AddHandler}>Add Ticket</button>
            <section className="info-tiles">
              <div className="container">
              <br/>
                <div className="table-wrapper has-mobile-cards">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th className="is-current-sort is-sortable">
                          <div className="th-wrap">
                            Ticket Type
                            <span className="icon is-small">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Creator
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Status
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                      <th className="is-sortable">
                          <div className="th-wrap">
                          </div>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                      {tickets.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.ticket_type}</td>
                          <td>{item.created_by}</td>
                          <td>{item.status}</td>
                          <td className="is-actions-cell">
                            <div className="buttons is-half">
                              <button
                                className="button is-small is-info jb-modal"
                                onClick={()=> history(`/ticket/detail/${item.ticket_id}`)}
                                type="button"
                              >
                                <span className="d">
                                  <i className="mdi mdi-trash-can">Detail</i>
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
