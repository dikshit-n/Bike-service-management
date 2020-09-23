import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import AdminPages from "./components/AdminPages/AdminPages";
import Auth from "./components/Auth/Auth";
import UserPages from "./components/UserPages/UserPages";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/admin" exact component={AdminPages} />
          <Route path="/user" exact component={UserPages} />
          <Route path="/auth" exact component={Auth} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
