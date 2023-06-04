import "./profile.scss";
// import WebCam from "react-webcam";
import { useState } from "react";
// import { useRef } from "react";
import axios from "axios";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const [showCamera, setShowCamera] = useState(false);
  // const [imgSrc, setImgSrc] = useState(null);
  // const inputRef = useRef(null);
  // const [imageData, setImageData] = useState(null);
  const storedItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    contact_no: user.contact_no,
    // profile_image: user.profile_image || imageData,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
    sessionStorage.removeItem("cartItems", JSON.stringify(storedItems));
    sessionStorage.removeItem("customer");
    localStorage.removeItem("orders");
    // window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.contact_no.length !== 10) {
      alert("Please enter a valid contact number");
      return;
    }
    try {
      const updatedInputs = { ...inputs };
      await axios.post(
        `${window.location.protocol}//${window.location.hostname}:8000/updateProfile`,
        updatedInputs
      );
      const user = updatedInputs;
      localStorage.setItem("user", JSON.stringify(user));
      setInputs(updatedInputs);
      alert("User details updated successfully!");
    } catch (err) {
      alert(
        "No internet connection found. Please check your connection and try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="profileMain">
      <div className="images">
        <img
          src="https://wallpapercave.com/wp/wp4289147.jpg"
          alt="cover image"
          className="cover"
        />
        <button className="logout" onClick={logout}>
          Logout
        </button>
        <div>
          <img
            src="https://i.stack.imgur.com/l60Hf.png"
            alt="profile image"
            className="profilePic"
          />
        </div>
      </div>

      <form className="profileForm" onSubmit={handleSubmit}>
        <div className="formContect">
          <div>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span>Email</span>
            <input
              type="text"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              readOnly
            ></input>
          </div>
          <div>
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span>Contact Number</span>
            <input
              type="text"
              name="contact_no"
              value={inputs.contact_no}
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};
