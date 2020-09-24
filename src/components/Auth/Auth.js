import React, { useState } from "react";
import SelectInput from "../UI/Select/Select";
import "./Auth.css";

const Auth = (props) => {
  const [login, setLogin] = useState(true);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    type: "",
  });

  const signUpChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const signInChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleLogin = () => {
    setLogin((prev) => !prev);
  };

  const validateSignUp = () => {
    let requiredValues = [
      signUpData.email,
      signUpData.password,
      signUpData.type,
    ];
    return requiredValues.every((el) => el.trim() !== "");
  };
  const validateSignIn = () => {
    let requiredValues = [signInData.email, signInData.password];
    return requiredValues.every((el) => el.trim() !== "");
  };

  const submitSignIn = (event) => {
    event.preventDefault();
    console.log(signInData);
    props.history.push("/user");
  };
  const submitSignUp = (event) => {
    event.preventDefault();
    console.log(signUpData);
    props.history.push("/user");
  };

  return (
    <div className="auth">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2
            onClick={toggleLogin}
            className={(login ? "active" : "inactive") + " cursor-pointer"}
          >
            {" "}
            Sign In{" "}
          </h2>
          <h2
            onClick={toggleLogin}
            className={
              (!login ? "active" : "inactive") +
              " underlineHover cursor-pointer"
            }
          >
            Sign Up{" "}
          </h2>
          {login ? (
            <form onSubmit={submitSignIn}>
              <input
                value={signInData.email}
                type="email"
                id="login"
                required
                onChange={signInChangeHandler}
                className="fadeIn second input"
                name="email"
                placeholder="email"
              />
              <input
                type="password"
                value={signInData.password}
                required
                onChange={signInChangeHandler}
                id="password"
                className="fadeIn third input"
                name="password"
                placeholder="password"
              />
              <input
                disabled={!validateSignIn()}
                type="submit"
                className="fadeIn fourth"
                defaultValue="Log In"
              />
            </form>
          ) : (
            <form onSubmit={submitSignUp}>
              <input
                type="email"
                onChange={signUpChangeHandler}
                id="login"
                required
                value={signUpData.email}
                className="fadeIn second input"
                name="email"
                placeholder="Email"
              />
              <input
                type="password"
                id="password"
                value={signUpData.password}
                className="fadeIn third input"
                onChange={signUpChangeHandler}
                required
                name="password"
                placeholder="password"
              />
              <div className="user-type">
                <label>Sign up as..</label>
                <SelectInput
                  value={signUpData.type}
                  name="type"
                  onChange={(value, name) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      type: value,
                    }))
                  }
                  placeholder="Who Are You ?"
                  options={["Owner", "Customer"]}
                />
              </div>
              <input
                disabled={!validateSignUp()}
                type="submit"
                className="fadeIn fourth"
                defaultValue="Log In"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
