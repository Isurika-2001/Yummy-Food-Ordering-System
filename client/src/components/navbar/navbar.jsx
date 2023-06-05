import Menu from "../../assets/menu.png";
import Dark from "../../assets/night-mode.png";
import CartIcon from "../../assets/grocery-store.png";
import Light from "../../assets/moon.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

export const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [mode, setMode] = useState(() => {
    // Retrieve the stored mode from localStorage or use the default value "light"
    return localStorage.getItem("mode") || "light";
  });
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

  const handleMode = (e) => {
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
        card.classList.add("dark-mode");
      }
      if (mode === "light") {
        card.classList.remove("dark-mode");
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
          <NavLink activeclassname="active" to="/">
            <span>Home</span>
          </NavLink>
          <NavLink activeclassname="active" to="/menu">
            <span>Menu</span>
          </NavLink>
          <NavLink activeclassname="active" to="/myorders">
            <span>My Orders</span>
          </NavLink>
          <NavLink activeclassname="active" to="/contactus">
            <span>Contact Us</span>
          </NavLink>
        </div>
        <div className="right">
          <div className="cart-flex">
            <span>{itemCount}</span>
            <Link className="cart-holder" to="/cart">
              <img className="cart-icon" src={CartIcon} alt="cart-image1" />
            </Link>
          </div>
          <img
            className="mode"
            src={mode === "light" ? Light : Dark}
            alt={mode === "light" ? "light-mode" : "dark-mode"}
            onClick={handleMode}
          ></img>
          {user ? (
            <Link to="/profile" className="userInfo">
              Profile
            </Link>
          ) : (
            <a className="userInfo" href="/login">
              Sign In
            </a>
          )}
        </div>
        {showMenu && (
          <div className={`mobile-menu ${showMenu ? "active" : ""}`}>
            <NavLink
              activeclassname="active"
              to="/"
              onClick={() => setShowMenu(false)}
            >
              <span>Home</span>
            </NavLink>
            <NavLink
              activeclassname="active"
              to="/menu"
              onClick={() => setShowMenu(false)}
            >
              <span>Menu</span>
            </NavLink>
            <NavLink
              activeclassname="active"
              to="/myorders"
              onClick={() => setShowMenu(false)}
            >
              <span>My Orders</span>
            </NavLink>
            <NavLink
              activeclassname="active"
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
