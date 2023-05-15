import Location from "../../assets/location.png";
import "./cart.scss";
import { Link } from "react-router-dom";

export const Cart = () => {
  const storedItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  let fullTotal = 0;

  storedItems.forEach((item) => {
    fullTotal += item.price * item.count;
  });

  const removeCart = () => {
    sessionStorage.removeItem("cartItems", JSON.stringify(storedItems));
    window.location.reload();
  };

  return (
    <div className="Main">
      <div className="cartMain">
        <div className="cartDetails">
          <div className="header">
            <h1>Cart</h1>
            <button className="remove" onClick={removeCart}>
              Clear Cart
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th className="name">Item Name</th>
                <th>Price</th>
                <th className="quantity">Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {storedItems.map((item) => (
                <tr key={item.id}>
                  <td className="name">{item.name}</td>
                  <td>{item.price}</td>
                  <td className="quantity">{item.count}</td>
                  <td>{item.price * item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <table>
            <thead>
              <tr>
                <th className="name">Total : </th>
                <th></th>
                <th className="quantity"></th>
                <th>{fullTotal}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="userDetails">
          <form>
            <div>
              <span>Contact number</span>
              <input
                type="text"
                name="contact"
                placeholder="enter your contact number here"
              ></input>
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                name="address"
                placeholder="enter your address or share your current location"
              ></input>
            </div>
          </form>
          <Link to="/location">
            <button className="locateMe">
              <img src={Location} alt="location"></img> LOCATE ME
            </button>
          </Link>
          <button className="order">Place Order</button>
        </div>
      </div>
    </div>
  );
};
