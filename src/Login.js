import React, { useState } from 'react';
import Main from './Main';
import axios from 'axios';
import { useEffect } from 'react';

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {

    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    };
    axios
        .get(process.env.REACT_APP_API_URL + "player/token/check",  {headers})
        .then((res) => {
            if(res.data === "true"){
              setIsLoggedIn(true);
            };
        }).catch((error) => {
          console.log(error.message);
        });
  }, []);

  const logoutHandler = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('access');
    localStorage.removeItem('ally_code');
    setIsLoggedIn(false);
  }

  const loginHandler = async () => {
    setLoginError("");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(process.env.REACT_APP_API_URL + '/player/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      localStorage.setItem('access', data.user.access);
      localStorage.setItem('ally_code', data.user.ally_code);
    } else {
      // Handle login failure
      const errorData = await response.json();
      setLoginError(errorData.message);
    }
  };

  return (
        <div>
            {isLoggedIn ? (
              <Main logoutHandler={logoutHandler}></Main>
          ) : (
            <div className="row">
                <div className="col-4 offset-4 card d-show mt-5 pb-3">
                  <h2 className="text-center mb-4">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter your username" required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" required></input>
                    </div>
                    <div className={loginError === "" ? "d-none" : "d-show pb-3 text-danger"}>
                      {loginError}
                    </div>
                    <button type="submit" onClick={loginHandler} className="btn btn-primary btn-block">Login</button>
                </div>
              </div>
          )}
        </div>
  );
};
