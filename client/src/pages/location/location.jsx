import { useEffect, useState } from "react";
import "./location.scss";

export const Location = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    geoLocation();
  }, []);

  const geoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        setError(error.message);
        console.log(error);
        alert("Internet connection is required!")
      },
      { timeout: 10000 }
    );
  };
  

  return (
    <div className="Main">
      {currentLocation.latitude && currentLocation.longitude && (
        <iframe
          src={`https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&z=15&output=embed`}
          scrolling="no"
        ></iframe>
      )}
      <form className="locationForm">
        <label htmlFor="address">Home Address</label>
        <div>
          <input className="no" type="text" name="no" placeholder="No" />
          <input type="text" name="address" placeholder="Address" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
