import React, { useState } from "react";
import Login from "./Login.js";
import Registration from "./Registration.js";
import Axios from "axios";
import "./Login.scss";

function LoginOrRegister(props) {
  const [loginOrReg, setLoginOrReg] = useState("login");

  return (
    <div>
      {loginOrReg === "login" ? (
        <Login history={props.history} />
      ) : (
        <Registration history={props.history} />
      )}
      <div className="buttonsArea">
        {loginOrReg === "registration" ? (
          <a
            href="#"
            className="register-login"
            onClick={() => {
              setLoginOrReg("login");
            }}
          >
            Have an account? Sign in!
          </a>
        ) : (
          <a
            href="#"
            className="register-login"
            onClick={() => {
              setLoginOrReg("registration");
            }}
          >
            Not signed up? Register!
          </a>
        )}
      </div>
    </div>
  );
}

export default LoginOrRegister;
