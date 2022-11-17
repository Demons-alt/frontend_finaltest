import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pasword, setPassword] = useState("");
  const [nik, setNik] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [projet, setProject] = useState("");

  const history = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        email: email,
        password: pasword,
        nik: nik,
        address: address,
        phone: phone,
        role: role,
        project_name : projet,
      });
      history("/login");
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
                <form className="box" onSubmit={Register}>
                  {/* <p className="has-text-centered">{message}</p> */}
                  <h1 className="title has-text-centered">Register</h1>
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
                    <label className="label">Pasword</label>
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
                    <label className="label">NIK</label>
                    <div className="controls">
                      <input
                        type="number"
                        className="input"
                        maxLength="16"
                        placeholder="35123783023880012874"
                        required
                          value={nik}
                          onChange={(e) => setNik(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Phone Number</label>
                    <div className="controls">
                      <input
                        type="number"
                        maxLength="12"
                        className="input"
                        placeholder="081523645852"
                        required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Address</label>
                    <div className="controls">
                      <input
                        type="text"
                        className="input"
                        placeholder="Jl. Mt Hariono no.18 kec. lalala"
                        required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Role</label>
                    <div className="controls">
                      <select className="input" placeholder="Please Select" onChange={(e) => setRole(e.target.value)}>
                        <option>Please Select</option>
                        <option value="HR">HR</option>
                        <option value="Projet Manager">Project Manager</option>
                        <option value="Developer">Developer</option>
                      </select>
                    </div>
                  </div>
                  <div className="field mt-5">
                    <label className="label">Project</label>
                    <div className="controls">
                      <select className="input" onChange={(e) => setProject(e.target.value)}>
                        <option>Please Select</option>
                        <option value="DSC">DSC</option>
                        <option value="Digipos">Digipos</option>
                        <option value="99Usahaku">99Usahaku</option>
                      </select>
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button className="button is-info is-fullwidth">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
