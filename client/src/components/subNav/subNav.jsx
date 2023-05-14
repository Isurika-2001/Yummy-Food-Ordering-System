// import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "./subNav.scss";

export const SubNav = () => {
  return (
    <div className="subNav">
      <Link activeClassName="active" spy={true} smooth={true} to="pizza">
        <span>Pizza</span>
      </Link>
      <Link activeClassName="active" spy={true} smooth={true} to="burgers">
        <span>Burgers</span>
      </Link>
      <Link activeClassName="active" spy={true} smooth={true} to="appetizes">
        <span>Appetizes</span>
      </Link>
      <Link activeClassName="active" spy={true} smooth={true} to="beverages">
        <span>Beverages</span>
      </Link>
    </div>
  );
};
