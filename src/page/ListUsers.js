import React, { useEffect, useState } from "react";
import { Slidebar } from "../components/Slidebar";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const ListUsers = () => {
  const Token = JSON.parse(sessionStorage.getItem("token"));
  const [user, setUser] = useState([]);
  const history = useNavigate();


  useEffect(() => {
    GetUser()
    getToken()
  },[]);


  function getToken(err) {
    try {
      const tokenString = sessionStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      jwtDecode(userToken);
    } catch (error) {
      history("/login");
    }
  }
  const GetUser = async() => {
    const response = await axios.get(`http://localhost:3001/user/all`,{
      headers: {
        Authorization: `bearer ${Token}`,
      }
    });
    setUser(response.data.data.data)
  };

  return (
    <div className="container is-fluid">
      <div className="columns">
        <Slidebar />
        <div className="column">
          <section className="hero is-info welcome ">
            <div className="hero-body">
              <div className="container is-fluid">
                <h1 className="title">List User </h1>
                <h2 className="subtitle">Keep Going ..</h2>
              </div>
            </div>
          </section>
          <div className="container">
          <br/>
            <section className="info-tiles">
              <div className="container">
                <div className="table-wrapper has-mobile-cards">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th className="is-current-sort is-sortable">
                          <div className="th-wrap">
                            Email
                            <span className="icon is-small">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Address
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Phone
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Role
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                        <th className="is-sortable">
                          <div className="th-wrap">
                            Project
                            <span className="icon is-small is-invisible">
                              <i className="mdi mdi-arrow-up"></i>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {user.map((item, index)=>(
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.role}</td>
                        <td>{item.project_name}</td>
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
