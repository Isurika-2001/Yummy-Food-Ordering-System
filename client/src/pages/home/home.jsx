import Yummy1 from "../../assets/Logo-yummy.png";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.scss";

export const Home = () => {
  const slideImages = [
    "https://th.bing.com/th/id/R.d8e6446972ee039e083a4893ed563653?rik=ZUgUawA0V8k%2feA&riu=http%3a%2f%2fisinglassinc.com%2fwp-content%2fuploads%2f2015%2f03%2frestaurant-food-01.jpg&ehk=QafWM00446%2fmdvb3O9HtydCp7Jh0C1PQqThGAit8OlE%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.c2177ff23f862b515dd9f1517b011727?rik=I2EKv2i33eUs6Q&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.5e638b93df69554c73ea2cb4230c3030?rik=Y6%2bArYpCQ8Jc%2fQ&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/R.4b69ae5e822b82c308fdeca8f4e568fa?rik=wwPGHRtS40XRLA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f3968862%2fimages%2fo-RESTAURANT-MEAL-facebook.jpg&ehk=ZVZ8ODSiIwfmEdQLPSB8kcSV7%2bDMkVUKBfyrLKDR1vs%3d&risl=&pid=ImgRaw&r=0",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideShowInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
    }, 3000);

    return () => clearInterval(slideShowInterval);
  }, []);

  return (
    <div className="homeMain">
      <div className="inside">
        <img src={Yummy1} alt="logoImage" />
        <div className="card">
          <h2>Wait is over</h2>
          <p>
            Experience the ultimate satisfaction at Yummy, where we specialize
            in crafting irresistible fast food delights.
          </p>
        </div>
        <div className="slideshow">
          {slideImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className={currentSlide === index ? "active" : ""}
            />
          ))}
        </div>
        <button>
          <NavLink activeClassName="active" to="/menu">
            <span>Order Now</span>
          </NavLink>
        </button>
      </div>
    </div>
  );
};
