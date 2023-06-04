import { useEffect, useState } from "react";
import "./location.scss";

export const Location = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    no: "",
    street: "",
  });

  useEffect(() => {
    geoLocation();
  }, []);

  const geoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (err) => {
        console.log(err);
        setError(err.message || "An error occurred.");
        alert(
          "Internet connection is required! " +
            (err.message || "An error occurred.")
        );
      },
      { timeout: 5000 }
    );
  };

  const handleLocation = (e) => {
    e.preventDefault();
    const location = currentLocation.latitude + "," + currentLocation.longitude;
    const address = `${inputs.no} ${inputs.street} ${location}`;
  
    // Retrieve the existing customer data from session storage
    const existingCustomerData = JSON.parse(sessionStorage.getItem("customer"));
  
    // Update the address in the existing customer data
    existingCustomerData.address = address;
  
    // Store the updated customer data in session storage
    sessionStorage.setItem("customer", JSON.stringify(existingCustomerData));
  
    // Redirect to "/cart" page
    window.location.href = "/cart";
  
    console.log(address);
  };
  

  const handleInputChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="Main">
      {currentLocation.latitude && currentLocation.longitude && (
        <iframe
          src={`https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}&z=15&output=embed`}
          scrolling="no"
        ></iframe>
      )}
      <form className="locationForm" onSubmit={handleLocation}>
        <label htmlFor="address">Home Address</label>
        <div>
          <input
            required
            className="no"
            type="text"
            name="no"
            placeholder="House no"
            value={inputs.no}
            onChange={handleInputChange}
          />
          <input
            required
            type="text"
            name="street"
            placeholder="Street (ex: 1st cross street)"
            value={inputs.street}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add location</button>
      </form>
    </div>
  );
};
