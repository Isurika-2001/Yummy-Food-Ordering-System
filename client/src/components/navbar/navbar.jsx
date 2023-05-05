import Menu from "../../assets/menu.png";
import Dark from "../../assets/night-mode.png";
import CartIcon from "../../assets/grocery-store.png";
import Light from "../../assets/moon.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.scss";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mode, setMode] = useState("light");
  const user = JSON.parse(localStorage.getItem("user"));
  const storedItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const itemCount = storedItems.length;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const card = document.querySelector(".card");
    if (mode === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    if (card) {
      if (mode === "dark") {
        card.classList.add("card-dark-mode");
      } else {
        card.classList.remove("card-dark-mode");
      }
    }
  }, [mode]);

  const handleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const card = document.querySelector(".card");
    if (mode === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    if (card) {
      if (mode === "dark") {
        card.classList.add("card-dark-mode");
      } else {
        card.classList.remove("card-dark-mode");
      }
    }
  }, [mode]);

  return (
    <div className="main">
      <div className="header">
        <div className="left">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <img src={Menu} alt="menu"></img>
          </div>
          <h2>Yummy</h2>
        </div>
        <div className="middle">
          <NavLink activeClassName="active" to="/">
            <span>Home</span>
          </NavLink>
          <NavLink activeClassName="active" to="/menu">
            <span>Menu</span>
          </NavLink>
          <NavLink activeClassName="active" to="/myorders">
            <span>My Orders</span>
          </NavLink>
          <NavLink activeClassName="active" to="/contactus">
            <span>Contact Us</span>
          </NavLink>
        </div>
        <div className="right">
          <div className="cart-flex">
            <span>{itemCount}</span>
            <a className="cart-holder" href="/cart">
              <img className="cart-icon" src={CartIcon} alt="cart-image1" />
            </a>
          </div>
          <img
            className="mode"
            src={mode === "light" ? Light : Dark}
            alt={mode === "light" ? "light-mode" : "dark-mode"}
            onClick={handleMode}
          ></img>
          {user ? (
            <a href="/profile" className="userInfo">
              {user.name}
            </a>
          ) : (
            <a className="userInfo" href="/login">
              Sign In / Sign Up
            </a>
          )}
        </div>
        {showMenu && (
          <div className={`mobile-menu ${showMenu ? "active" : ""}`}>
            <NavLink
              activeClassName="active"
              to="/"
              onClick={() => setShowMenu(false)}
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/menu"
              onClick={() => setShowMenu(false)}
            >
              <span>Menu</span>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/myorders"
              onClick={() => setShowMenu(false)}
            >
              <span>My Orders</span>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/contactus"
              onClick={() => setShowMenu(false)}
            >
              <span>Contact Us</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};