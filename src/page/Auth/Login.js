import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


 const Login = () => {
  const [email, setEmail] = useState("");
  const [pasword, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();
  
  const Register = () =>{
    history("/register")
  }
  const credentials = {
    email: email,
    password: pasword,
  };
  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/user/Login",
        credentials
      );
      console.log(response);
      console.log(response.data.Token);
      if (response.data.Token != null) {
        await sessionStorage.setItem(
          "token",
          JSON.stringify(response.data.Token)
        );
        history("/");
      }
      setMessage("worng Email Or Password");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <section className="hero has-background-dark is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <form className="box" onSubmit={Login}>
                  <p className="has-text-centered">{message}</p>
                  <h1 className="title has-text-centered">Login</h1>
                  <div className="field mt-5">
                    <label className="label">Email</label>
                    <div className="controls">
                      <input
                        type="email"
                        className="input"
                        placeholder="gagaga@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">pasword</label>
                    <div className="controls">
                      <input
                        type="password"
                        className="input"
                        placeholder="*********"
                        required
                        value={pasword}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">
                      Login
                    </button>
                  </div>
                </form>
                <button className="button is-info is-fullwidth" onClick={Register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Login
