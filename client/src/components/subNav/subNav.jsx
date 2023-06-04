// import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "./subNav.scss";

export const SubNav = () => {
  return (
    <div className="subNav">
      <Link activeclassname="active" spy={true} smooth={true} to="burgers">
        <span>Burgers</span>
      </Link>
      <Link activeclassname="active" spy={true} smooth={true} to="pizza">
        <span>Pizza</span>
      </Link>
      <Link activeclassname="active" spy={true} smooth={true} to="appetizes">
        <span>Appetizes</span>
      </Link>
      <Link activeclassname="active" spy={true} smooth={true} to="beverages">
        <span>Beverages</span>
      </Link>
    </div>
  );
};
