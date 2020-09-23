import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import NavBar from "../UI/NavBar/NavBar";
import "./AdminPages.css";
import Orders from "./Orders/Orders";
import Services from "./Services/Services";

const AdminPages = (props) => {
  const [adminRoutes] = useState([
    // { name: "Home", to: "/admin" },
    { name: "Services", to: props.match.path + "/services" },
    { name: "Orders", to: props.match.path + "/orders" },
    { name: "Logout", to: "/logout" },
  ]);
  return (
    <div>
      <NavBar routes={adminRoutes} />
      {props.location.pathname === "/admin" ? (
        // <Fragment>
        //   <br />
        //   <br />
        //   <br />
        //   <br />
        //   Welcome Admin
        // </Fragment>
        <Redirect to={props.match.path + "/orders"} />
      ) : null}
      <Switch>
        <Route path={props.match.path + "/services"} component={Services} />
        <Route path={props.match.path + "/orders"} component={Orders} />
      </Switch>
    </div>
  );
};

export default AdminPages;
