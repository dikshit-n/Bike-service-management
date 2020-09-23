import React, { useState } from "react";
import "./UserPages.css";
import NavBar from "../UI/NavBar/NavBar";
import { Redirect, Route, Switch } from "react-router";
import BookNew from "./BookNew/BookNew";
import Previous from "./Previous/Previous";

const UserPages = (props) => {
  const [userRoutes] = useState([
    { name: "Book a Service", to: props.match.path + "/book" },
    { name: "Previous Bookings", to: props.match.path + "/previous" },
    { name: "Logout", to: "/logout" },
  ]);
  return (
    <div>
      <NavBar routes={userRoutes} />
      {props.location.pathname === "/user" ? (
        // <Fragment>
        //   <br />
        //   <br />
        //   <br />
        //   <br />
        //   Welcome User
        // </Fragment>
        <Redirect to={props.match.path + "/previous"} />
      ) : null}
      <Switch>
        <Route path={props.match.path + "/book"} component={BookNew} />
        <Route path={props.match.path + "/previous"} component={Previous} />
      </Switch>
    </div>
  );
};

export default UserPages;
