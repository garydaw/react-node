import React, { useState } from 'react';
import Main from './Main';

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = async () => {

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
      // Save the token and handle authentication on the client side
      console.log('Token:', data.token);
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
    }
  };

  return (
        <div>
            <div className="row">
              <div className={isLoggedIn ? "d-none" : "col-4 offset-4 card d-show mt-5 pb-3"}>
                <h2 className="text-center mb-4">Login</h2>
                  <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input type="text" className="form-control" id="username" placeholder="Enter your username" required></input>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Enter your password" required></input>
                  </div>
                  <button type="submit" onClick={loginHandler} className="btn btn-primary btn-block">Login</button>
              </div>
            </div>
            <div className={isLoggedIn ? "d-show" : "d-none"}><Main></Main></div>
        </div>
  );
};
