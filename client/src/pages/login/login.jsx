import { useState } from "react";
import axios from "axios";

import "./login.scss";
export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = () => {
    setIsTyping(true);
    setErr(null);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.229.66:8000/login",
        inputs
      );
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (err) {
      setErr(err.response.data.message);
    }
  };

  return (
    <div className="AuthMain">
      <div className="header">
        <h1>Sign In</h1>
        <span>Please Login to continue</span>
      </div>
      {err && !isTyping && (
        <span
          className="err"
          style={{
            color: err === "Successfully Logged In" ? "rgb(0, 172, 95)" : "red",
          }}
        >
          {err}
        </span>
      )}
      <form>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        <button type="submit" name="signup" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
      <div className="moreInfo">
        <span>New user? </span>
        <a href="/register">Sign Up</a>
      </div>
    </div>
  );
};
