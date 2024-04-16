import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData }  from "../Logic/AuthWrapper";
import "../Login.css"

export const Login = () => {
  const { login } = AuthData();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const response = await fetch('http://localhost:8080/admin/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();

      if (data === 'OK') {
        // Redirect user to authenticated page or perform desired action
        console.log('Login successful');
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <div className="heading">Sign In</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="text"
          name="username"
          id="username"
          placeholder="Joan"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          required
          className="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input className="login-button" type="submit" value="Sign In" />
      </form>
      {errorMessage ? <div className="error">{errorMessage}</div> : null}
    </div>
  );
};

export default Login;