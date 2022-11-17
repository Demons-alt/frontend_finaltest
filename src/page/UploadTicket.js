import React, { useState, useEffect } from "react";
import { Slidebar } from "../components/Slidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const UploadTicket = () => {
  const { email } = useSelector((state) => state.user);
  const [isFetching, setFetching] = useState(false);
  const [files, setFiles] = useState(null);
  const [dataTableInput, setDataTableInput] = useState([]);
  const [redisKeyUpload, setRedisKeyUpload] = useState("");
  const history = useNavigate();

  const [approve, setApproval] = useState("la");
  const [Creator, setCreator] = useState("");

  useEffect(() => {
    Approval();
  }, []);

  const changeHandlerInput = (event) => {
    console.log(event.target.files[0], "tes");
    setFiles(event.target.files[0]);

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    fetch("http://localhost:3001/activity/file", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDataTableInput(result);
        setRedisKeyUpload(result[0].id_ticket);
        setFetching(true);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("submit");
  };


  const createticket = async () => {
    try {
      await axios.post("http://localhost:3001/ticket/add", {
        ticket_id: redisKeyUpload,
        ticket_type: "Rembestmen",
        created_by: email,
        current_approval_name: approve,
        current_approval_role: "HR",
        status: "Pending",
      });
      console.log(approve);
    } catch (error) {
      console.log(error);
    }
  };

  
  const Approval = () => {
    fetch(`http://localhost:3001/user/all`)
      .then((response) => response.json())
      .then((result) => {
        setCreator(result.data.data);
      });
  };
  const produce = () => {
    axios({
      method: "post",
      url: "http://localhost:3001/ticket/produce",
      data: {
        email: approve,
        id_ticket: redisKeyUpload,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  const handleSubmit = () => {
    fetch(`http://localhost:3001/activity/file/post/${redisKeyUpload}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "tes");
      });
  };
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
  const submit = async () => {
    await createticket();
    await handleSubmit();
    history("/ticket");
    await sleep(10000)
    produce();
    
  };

  console.log(Creator);

  return (
    <div className="container is-fluid">
      <div className="columns">
        <Slidebar />
        <div className="column">
          <section className="hero is-info welcome ">
            <div className="hero-body">
              <div className="container is-fluid">
                <h1 className="title">Create Ticket</h1>
              </div>
            </div>
          </section>
          <br />
          <div className="container">
            <section className="info-tiles">
              <div className="field">
                <h1 className="title label">Upload File</h1>
                <input
                  className="button is-left"
                  type="file"
                  name="file"
                  accept=".xlsx"
                  onChange={changeHandlerInput}
                />
                <br />
                {isFetching ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th className="is-current-sort is-sortable">
                            <div className="th-wrap">
                              Description
                              <span className="icon is-small">
                                <i className="mdi mdi-arrow-up"></i>
                              </span>
                            </div>
                          </th>
                          <th className="is-sortable">
                            <div className="th-wrap">Date</div>
                          </th>
                          <th className="is-sortable">
                            <div className="th-wrap">
                              Amount Claim
                              <span className="icon is-small is-invisible">
                                <i className="mdi mdi-arrow-up"></i>
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataTableInput &&
                          dataTableInput.map((item, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>{item.activity_date}</td>
                                <td>Rp.{item.total_claim},00-</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <select
                      class="button"
                      onChange={(e) => setApproval(e.target.value)}
                    >
                      <option>Please Select</option>
                      {Creator.map((item) => {
                        return (
                          <option class="dropdown-item" value={item.email}>
                            {item.email} as {item.role}
                          </option>
                        );
                      })}
                    </select>
                  </>
                ) : (
                  ""
                )}
                <button
                  class="button is-success is-outlined"
                  disabled={!files}
                  onClick={submit}
                >
                  Submit
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
