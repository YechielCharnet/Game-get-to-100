import "./registration.css";
import React, { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldsMessage, setFieldsMessage] = useState("");
  const [colorError, setColorError] = useState("red");

  const clearVariables = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setErrorMessage("");
  };

  const login = () => {
    if (!username || !password) {
      setFieldsMessage("Please fill in all fields.");
      return;
    }
    setFieldsMessage("");
    const users = JSON.parse(localStorage.getItem("gameUsers")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentPlayers([...currentPlayers, user]);
      clearVariables();
    } else {
      setColorError("red");
      setErrorMessage("Invalid username or password. Register or try again.");
    }
  };

  const register = () => {
    if (!username || !password || !email) {
      setFieldsMessage("Please fill in all fields.");
      return;
    }
    setFieldsMessage("");
    const users = JSON.parse(localStorage.getItem("gameUsers")) || [];
    const existingUser = users.find(
      (u) => u.email === email || u.username === username
    );
    if (existingUser) {
      setColorError("#bebc15");
      setErrorMessage("Email or username already exist. Please try again.");
    } else {
      const newUser = { email, username, password };
      localStorage.setItem("gameUsers", JSON.stringify([...users, newUser]));
      setCurrentPlayers([...currentPlayers, newUser]);
      clearVariables();
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Get to 100 !</h1>
      <div className="players">
        <h3>Current players :</h3>
        <ul>
          {currentPlayers.map((player, index) => (
            <li key={index}>{player.username}</li>
          ))}
        </ul>
      </div>
      <h3>Please sign in or register to join the game.</h3>
      <div className="form-group">
        {fieldsMessage && <p className="fieldsMessage">{fieldsMessage}</p>}
        {errorMessage && (
          <>
            <p
              style={{
                color: colorError,
                marginBottom: "15px",
              }}
            >
              {errorMessage}
            </p>
            <div className="form">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form">
          <label htmlFor="username">Username :</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="btn-group">
        <button className="btn" onClick={login}>
          Login
        </button>
        {errorMessage && (
          <button className="btn" onClick={register}>
            Register
          </button>
        )}
        {currentPlayers.length > 0 && (
          <button className="btn" /*onClick={<Game name={currentPlayers} />}*/>
            Start playing
          </button>
        )}
      </div>
    </div>
  );
};

export default Registration;
