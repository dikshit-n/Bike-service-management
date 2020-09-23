import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import AdminPages from "./components/AdminPages/AdminPages";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/logout";
import UserPages from "./components/UserPages/UserPages";

function App() {
  let routes;
  var type = "admin";
  var auth = true;
  if (type === "admin") {
    routes = (
      <Switch>
        <Route path="/admin" component={AdminPages} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to={auth ? "/admin" : "/auth"} />
      </Switch>
    );
  } else if (type === "user") {
    routes = (
      <Switch>
        <Route path="/user" component={UserPages} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to={auth ? "/user" : "/auth"} />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
    </div>
  );
}

export default App;
