import React, { useEffect, useState } from "react";
import { Slidebar } from "../components/Slidebar";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const DetailTicket = () => {
    const Token = JSON.parse(sessionStorage.getItem("token"));
    const [tickets, setTickets] = useState([]);
    const [activity, setActivity] = useState([]);
    const history = useNavigate();
  
    const {id} = useParams()
    useEffect(() => {
      GetActivity()
      GetDetaiTicket()
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
    const GetDetaiTicket = async () => {
        const response = await axios.get(
          `http://localhost:3001/ticket/detail/${id}`,
          {
            headers: {
              Authorization: `bearer ${Token}`,
            },
          }
        );
        setTickets(response.data.data[0]);
      };
    
  
  
    const GetActivity = async () => {
      const response = await axios.get(
        `http://localhost:3001/activity/list/${id}`,
        {
          headers: {
            Authorization: `bearer ${Token}`,
          },
        }
      );
      setActivity(response.data.data);
    };
  
  
    console.log(tickets);
  return (
    <div>
      <div className="container is-fluid">
        <div className="columns">
          <Slidebar />
          <div className="column">
            <section className="hero is-info welcome ">
              <div className="hero-body">
                <div className="container is-fluid">
                  <h1 className="title">Detail Ticket ID : {id}</h1>
                </div>
              </div>
            </section>
            <div className="container">
              <br />
              <section className="info-tiles">
                <div className="container">
                <br/>
                <div className="table-wrapper has-mobile-cards">
                    <h1 className="subtitle">Ticket Type : <text>{tickets.ticket_type}</text></h1>
                    <h1 className="subtitle">Creator : <text>{tickets.created_by}</text></h1>
                    <h1 className="subtitle">Create Date : <text>{tickets.created_at}</text></h1>
                    <h1 className="subtitle">Update Date : <text>{tickets.update_at}</text></h1>
                    <h1 className="subtitle">Approval To : <text>{tickets.current_approval_name}</text></h1>
                    <h1 className="subtitle">Status : <text>{tickets.status}</text></h1>
                </div>
                  <br />
                  <h2 className="title">Activity</h2>
                  <div className="table-wrapper has-mobile-cards">
                    <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th className="is-current-sort is-sortable">
                            <div className="th-wrap">
                              Date
                              <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i>
                              </span>
                            </div>
                          </th>
                          <th className="is-sortable">
                            <div className="th-wrap">
                              Description
                              <span className="icon is-small is-invisible">
                                <i className="mdi mdi-arrow-up"></i>
                              </span>
                            </div>
                          </th>
                          <th className="is-sortable">
                            <div className="th-wrap">
                              Total Claim
                              <span className="icon is-small is-invisible">
                                <i className="mdi mdi-arrow-up"></i>
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.activity_date}</td>
                            <td>{item.description}</td>
                            <td>{item.total_claim}</td>
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
    </div>
  );
};

export default DetailTicket;
