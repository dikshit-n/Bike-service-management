import React from "react";
import { Redirect } from "react-router";

const Logout = (props) => {
  return <Redirect to="/auth" />;
};

export default Logout;
