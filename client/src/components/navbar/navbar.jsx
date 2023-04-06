import Logo from "../../assets/logo.png";
import Menu from "../../assets/menu.png";
import Dark from "../../assets/night-mode.png";
import Light from "../../assets/moon.png";
import { useState } from "react";
import { useEffect } from "react";
import "./navbar.scss";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mode, setMode] = useState("light");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (mode === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [mode]);


  return (
    <div className="main">
      <div className="header">
        <div className="left">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <img src={Menu} alt="menu"></img>
          </div>
          <img src={Logo} alt="logo"></img>
          <h2>Yummy</h2>
        </div>
        <div className="middle">
          <a href="/">Home</a>
          <a href="menu">Menu</a>
          <a href="myorders">My Orders</a>
          <a href="contactus">Contact Us</a>
        </div>
        <div className="right">
          <img
            className="mode"
            src={mode === "light" ? Light : Dark}
            alt={mode === "light" ? "light-mode" : "dark-mode"}
            onClick={handleMode}
          ></img>
          <a href="/login">Sign In</a>
        </div>
        {showMenu && (
          <div className="mobile-menu">
            <a href="/">Home</a>
            <a href="menu">Menu</a>
            <a href="myorders">My Orders</a>
            <a href="contactus">Contact Us</a>
          </div>
        )}
      </div>
    </div>
  );
};
