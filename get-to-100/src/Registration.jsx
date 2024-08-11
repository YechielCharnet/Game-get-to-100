import React, { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldsMessage, setFieldsMessage] = useState("");
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
      setErrorMessage(
        "Invalid username or password. Please try again or register."
      );
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
    if (existingUser)
      setErrorMessage("Email or username already exist. Please try again.");
    else {
      const newUser = { email, username, password };
      localStorage.setItem("gameUsers", JSON.stringify([...users, newUser]));
      setCurrentPlayers([...currentPlayers, newUser]);
      clearVariables();
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Get to 100!</h1>
      <div className="players">
        <h2>Current Players:</h2>
        <ul>
          {currentPlayers.map((player, index) => (
            <li key={index}>{player.username}</li>
          ))}
        </ul>
      </div>
      <div className="form">
        <p>Please sign in or register to join the game.</p>
        <p className="fieldsMessage">{fieldsMessage}</p>
        {errorMessage && (
          <div>
            <div className="error">{errorMessage}</div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        <div>
          <div className="form-group">
            <label htmlFor="username">User name: </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          </div>
        </div>
      </div>
      {/* <button className="btn-group" onClick={<Game name={currentPlayers} />}>Start playing</button> */}
    </div>
  );
};

export default Registration;
