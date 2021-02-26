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
  const [nickName, setNickName] = useState("");
  const [profilePic, setprofilePic] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [cookies, setCookie] = useCookies(["auth"]);

  const sendNewUserData = () => {
    if (firstPassword !== secondPassword) {
      alert("Passwords are not equal!");
    } else {
      Axios.post("http://localhost:8762/registertrader", {
        username: userName,
        password: firstPassword,
        nickName: nickName,
        profilePic_: profilePic,
        e_mail: email,
      })
        .then((data) => {
          /*removeCookies();
          document.cookie = `Authorization=${data.data.token}`;*/
          
          setIsLoggedIn(true);
          console.log("DATA: ", data);
          if(data.data === true){
            alert("Successfully registered!")
          } else {
            alert("Username and/or email address taken!");
          }
        })
        .catch((e) => {
          alert("Username and/or email address taken!");
        });
    }
  };

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
            <input
              className="nickname"
              id="nickname"
              type="text"
              name="nickname"
              title="nickname"
              placeholder="Nickname"
              required
              onChange={(e) => setNickName(e.target.value)}
            />
            <input
              className="profilepic"
              id="profilepic"
              type="text"
              name="profilepic"
              title="profilepic"
              placeholder="Profilepic"
              required
              onChange={(e) => setprofilePic(e.target.value)}
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
