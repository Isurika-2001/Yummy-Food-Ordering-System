import Yummy1 from "../../assets/Logo-yummy.png";
import "./home.scss";

export const Home = () => {
  return (
    <div className="homeMain">
      <div className="inside">
        <img src={Yummy1} alt="logoImage" />
        <div className="card">
          <h2>Wait is over</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
};

