import "./profile.scss";
import WebCam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showCamera, setShowCamera] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const inputRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    contact_no: user.contact_no,
    profile_image: user.profile_image || imageData,
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handleTakePhoto = () => {
    const imgSrc = inputRef.current.getScreenshot();
    setImgSrc(imgSrc);
    setShowCamera(false);
    const imageData = imgSrc.replace("data:image/jpeg;base64,", "");
    setImageData(imageData);
  };

  const handleProfilePicClick = () => {
    setImgSrc(null);
    setShowCamera(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profile_image = imageData || inputs.profile_image;
      const updatedInputs = { ...inputs, profile_image };
      await axios.post("http://localhost:8000/updateProfile", updatedInputs);
      const user = updatedInputs;
      localStorage.setItem("user", JSON.stringify(user));
      setInputs(updatedInputs);
      alert("User details updated successfully!")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profileMain">
      <div className="images">
        <img
          src="https://wallpapercave.com/wp/wp4289147.jpg"
          alt=""
          className="cover"
        />
        <button className="logout" onClick={logout}>
          Logout
        </button>
        <div>
          {imgSrc ? (
            <img
              onClick={handleProfilePicClick}
              src={imgSrc}
              alt=""
              className="profilePic"
            />
          ) : (
            <img
              onClick={handleProfilePicClick}
              src={inputs.profile_image}
              alt=""
              className="profilePic"
            />
          )}
        </div>
        {showCamera && (
          <div className="cameraContainer">
            <WebCam audio={false} ref={inputRef} />
            <button className="take" onClick={handleTakePhoto}>
              Take Photo
            </button>
            <button className="close" onClick={handleCloseCamera}>
              Close Camera
            </button>
          </div>
        )}
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
