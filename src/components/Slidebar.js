import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

export const Slidebar = () => {
  const { role } = useSelector((state) => state.user);
  const history = useNavigate();
  async function removeToken() {
    try {
      await sessionStorage.removeItem("token");
      console.log("removed");
      history("/login");
    } catch (error) {
      console.log(error);
    }
  }
  if (role == "HR") {
    return (
      <div className="column is-1">
        <aside className="menu is-hidden-mobile">
          <ul className="menu-list">
          <p className="menu-label">menu</p>
            <li>
              <NavLink to="/">Dasboard</NavLink>
            </li>
            <li>
              <NavLink to="/ticket">My Ticket</NavLink>
            </li>
            <p className="menu-label">HR</p>
            <li>
              <NavLink to="/ticket/list">List Ticket</NavLink>
            </li>
            <li>
              <NavLink to="/User/list">List User</NavLink>
            </li>
          </ul>
          <a className="button is-danger" onClick={removeToken}>
            Log out
          </a>
        </aside>
      </div>
    );
  } else if (role == "Project Manager") {
    return (
      <div className="column is-1">
        <aside className="menu is-hidden-mobile">
          <p className="menu-label">menu</p>
          <ul className="menu-list">
            <li>
              <NavLink to="/">Dasboard</NavLink>
            </li>
            <li>
              <NavLink to="/ticket">My Ticket</NavLink>
            </li>
            <li>
              <NavLink to="/ticket/add">Create ticket</NavLink>
            </li>
            <p className="menu-label">Project Manager</p>
            <li>
              <NavLink to="/ticket/list/pm">List Ticket</NavLink>
            </li>
            <li>
              <NavLink to="/User">List User</NavLink>
            </li>
          </ul>
          <a className="button is-danger" onClick={removeToken}>
            Log out
          </a>
        </aside>
      </div>
    );
  } else {
    return (
      <div className="column is-1">
        <aside className="menu is-hidden-mobile">
          <p className="menu-label">menu</p>
          <ul className="menu-list">
            <li>
              <NavLink to="/">Dasboard</NavLink>
            </li>
            <li>
              <NavLink to="/ticket">My Ticket</NavLink>
            </li>
            <li>
              <NavLink to="/ticket/add">Create ticket</NavLink>
            </li>
          </ul>
          <a className="button is-danger" onClick={removeToken}>
            Log out
          </a>
        </aside>
      </div>
    );
  }
};
