import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Slidebar } from "../components/Slidebar";
import { useDispatch } from "react-redux";
import { store } from "../features/Userinfo";
import axios from "axios";

export const HomePaage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [summary, setSumary] = useState("");
  const [Token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone_number] = useState("");
  const [join_date, setJoin_date] = useState("");
  const [role, setRole] = useState("");
  const [project, setProject] = useState("");
  const [nik, setNik] = useState("");

  useEffect(() => {
    getToken();
    GetSummary();
  }, []);

  useEffect(() => {
    StoreDate();
  });
  function getToken() {
    try {
      const tokenString = sessionStorage.getItem("token");
      const userToken = JSON.parse(tokenString);
      const decode = jwtDecode(userToken);
      setEmail(decode.result[0].email);
      setPassword(decode.result[0].password);
      setNik(decode.result[0].nik);
      setAdress(decode.result[0].adress);
      setPhone_number(decode.result[0].phone_number);
      setJoin_date(decode.result[0].join_date);
      setRole(decode.result[0].role);
      setProject(decode.result[0].project_name);
      setToken(userToken);
    } catch (error) {
      history("/login");
    }
  }
  function StoreDate() {
    dispatch(
      store({ email, password, nik, adress, phone, join_date, role, project })
    );
  }

  const GetSummary = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    const decode = jwtDecode(userToken);
    axios.get(
      `http://localhost:3001/ticket/summary/${decode.result[0].email}`,
      {
        headers: {
          Authorization: `bearer ${Token}`,
        },
      }
    ).then((response)=>{
      setSumary(response.data.data[0]);
      console.log(email);
    });
  };

  return (
    <div className="container is-fluid">
      <div className="columns">
        <Slidebar />
        <div className="column">
          <section className="hero is-info welcome ">
            <div className="hero-body">
              <div className="container is-fluid">
                <h1 className="title">Hello, {email}</h1>
                <h2 className="subtitle">{project} is your project</h2>
                <h2 className="subtitle">I hope you are having a great day!</h2>
              </div>
            </div>
          </section>
          <br/>
          <div className="container">
            <section className="info-tiles">

              <h1 className="title has-text-centered">Your Ticket</h1>
              <div className="tile is-ancestor has-text-centered">
                <div className="tile is-parent">
                  <article className="tile is-child box has-background-success">
                    <p className="title">{summary.approve}</p>
                    <p className="subtitle">Approve</p>
                  </article>
                </div>
                <div className="tile is-parent ">
                  <article className="tile is-child box has-background-link">
                    <p className="title">{summary.pending}</p>
                    <p className="subtitle">Pending</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child box has-background-danger">
                    <p className="title">{summary.reject}</p>
                    <p className="subtitle">Rejected</p>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
