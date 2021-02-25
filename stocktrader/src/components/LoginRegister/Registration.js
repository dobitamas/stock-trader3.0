import React, { useState, useContext } from "react";
import Axios from "axios";
import { LoggedInContext } from "../../context/LoggedInContext";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useCookies } from "react-cookie";

function Registration(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [cookies, setCookie] = useCookies(["auth"]);

  const sendNewUserData = () => {
    if (firstPassword !== secondPassword) {
      alert("Passwords are not equal!");
    } else {
      Axios.post("http://localhost:8762/auth/registration", {
        username: userName,
        email: email,
        password: firstPassword,
      })
        .then((data) => {
          /*removeCookies();
          document.cookie = `Authorization=${data.data.token}`;*/
          setCookie("auth", data.data.token, { path: "/" });
          localStorage.clear();
          window.localStorage.setItem("username", userName);
          window.localStorage.setItem("roles", data.data.roles);
          setIsLoggedIn(true);
          props.history.push("/");
        })
        .catch((e) => {
          alert("Username and/or email address taken!");
        });
    }
  };

  function removeCookies() {
    var res = document.cookie;
    var multiple = res.split(";");
    for (var i = 0; i < multiple.length; i++) {
      var key = multiple[i].split("=");
      document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
    }
  }

  const togglePasswordVisibility = () => {
    let passwordInput = document.getElementById("password");
    let passwordInput2 = document.getElementById("password2");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordInput2.type = "text";
    } else {
      passwordInput.type = "password";
      passwordInput2.type = "password";
    }
  };

  return (
    <div>
      <div id="login">
        <div class="login-card">
          <div class="card-title">
            <h1>Please Register</h1>
          </div>

          <div class="content">
            <input
              id="email"
              type="text"
              name="email"
              title="email"
              placeholder="Username"
              required
              autoComplete="off"
              autofocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              id="email"
              type="text"
              name="email"
              title="email"
              placeholder="Email"
              autoComplete="off"
              required
              autofocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              type="password"
              name="password"
              title="password"
              placeholder="Password"
              required
              onChange={(e) => setFirstPassword(e.target.value)}
            />
            <input
              className="password"
              id="password2"
              type="password"
              name="password"
              title="password"
              placeholder="Password again"
              required
              onChange={(e) => setSecondPassword(e.target.value)}
            />

            <div class="level options">
              <div class="checkbox level-left">
                <input
                  type="checkbox"
                  id="checkbox"
                  class="regular-checkbox"
                  onClick={togglePasswordVisibility}
                />
                <label for="checkbox"></label>
                <span>Show password</span>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              onClick={sendNewUserData}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
