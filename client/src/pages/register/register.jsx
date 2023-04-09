import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
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
      await axios.post("http://localhost:8000/register", inputs);
      const response = await axios.post("http://localhost:8000/login", inputs);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setErr(err.response.data.error);
    }
  };

  return (
    <div className="AuthMain">
      <div className="header">
        <h1>Sign Up</h1>
        <span>Register yourself</span>
      </div>
      {err && !isTyping && (
        <span
          className="err"
          style={{
            color:
              err === "Successfully Registered" ? "rgb(0, 172, 95)" : "red",
          }}
        >
          {err}
        </span>
      )}
      <form>
      <input
          type="name"
          placeholder="name"
          name="name"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
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
        <input
          type="password"
          placeholder="confirm password"
          name="c_password"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></input>
        <button type="submit" name="signup" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
      <div className="moreInfo">
        <span>Already have an account? </span>
        <a href="/login">Sign In</a>
      </div>
    </div>
  );
};
