import "./contactUs.scss";
export const Contactus = () => {
  const handleSubmit = (e) => {
    alert("Your message has been recoded successfully!")
  }

  return (
    <div className="contactUsMain">
      <div className="contactForm">
        <h1>Contact Us</h1>
        <form>
          <input type="text" name="name" placeholder="Your Name" required/>
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required/>
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button onClick={handleSubmit} type="submit">Submit</button>
        </form>
      </div>
      <div className="socialMediaLinks">
        <h2>Follow Us On</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/yummyfoods">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                alt="Facebook"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/yummyfoods">
              <img
                src="https://cdn-icons-png.flaticon.com/128/174/174855.png"
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/yummyfoods">
              <img
                src="https://cdn-icons-png.flaticon.com/128/733/733579.png"
                alt="Twitter"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
