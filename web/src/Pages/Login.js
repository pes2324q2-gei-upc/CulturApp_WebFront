import React from 'react';
import '../Login.css'; // Importing the CSS file


function Login() {
  return (
    <div className="container">
        <div className="heading">Sign In</div>
        <form action="" className="form">
          <input required className="input" type="email" name="email" id="email" placeholder="E-mail" />
          <input required className="input" type="password" name="password" id="password" placeholder="Password" />
          <input className="login-button" type="submit" value="Sign In" />
        </form>
    </div>
  );
}

export default Login;