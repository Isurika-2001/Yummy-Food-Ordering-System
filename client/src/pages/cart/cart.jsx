import { useState } from "react";
import Location from "../../assets/location.png";
import "./cart.scss";
import axios from "axios";

export const Cart = () => {
  // get contact and address from the session storage
  const storedCustomer = JSON.parse(sessionStorage.getItem("customer"));
  const storedItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const user = JSON.parse(localStorage.getItem("user"));
  const [inputs, setInputs] = useState({
    contact: storedCustomer
      ? storedCustomer.contact
      : user
      ? user.contact_no
      : "",
    address: storedCustomer ? storedCustomer.address : "",
  });

  let fullTotal = 0;

  storedItems.forEach((item) => {
    fullTotal += item.price * item.count;
  });

  const removeCart = () => {
    sessionStorage.removeItem("cartItems", JSON.stringify(storedItems));
    window.location.reload();
  };

  const handleData = () => {
    if (inputs.contact === "") {
      alert("Please enter your contact number");
    } else if (inputs.contact.length !== 10) {
      alert("Please enter a valid contact number");
    } else {
      const customer = { ...inputs };
      sessionStorage.setItem("customer", JSON.stringify(customer));
      window.location.href = "/location";
    }
  };

  const placeOrder = (event) => {
    event.preventDefault();
    if (storedItems.length === 0) {
      alert("Your cart is empty");
    } else if (inputs.contact === "") {
      alert("Please enter your contact number");
    }else if (inputs.contact.length !== 10) {
      alert("Please enter a valid contact number");
    } else if (inputs.address === "") {
      alert("Please select your location");
    } else {
      const orderId = generateOrderId();
      const orderDate = new Date();

      const order = {
        orderId: orderId,
        customer: storedCustomer,
        items: storedItems,
        total: fullTotal,
        date: orderDate.toISOString(),
      };

      const orderData = {
        orderId: orderId,
        contact: storedCustomer.contact,
        address: storedCustomer.address,
        status: "pending",
        date: orderDate.toISOString(),
      };

      const itemData = storedItems.map((item) => ({
        orderId: orderId,
        itemId: item.id,
        name: item.name,
        count: item.count,
        price: item.price,
      }));

      // Add order to the database
      axios
        .post(
          `${window.location.protocol}//${window.location.hostname}:8000/order`,
          orderData
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      // Add items to the database
      axios
        .post(
          `${window.location.protocol}//${window.location.hostname}:8000/item`,
          itemData
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));

      // Store the order in local storage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(order);
      localStorage.setItem("orders", JSON.stringify(existingOrders));
      sessionStorage.removeItem("cartItems", JSON.stringify(storedItems));

      alert("Order placed successfully");

      // Redirect to my orders page
      window.location.href = "/myorders";
    }
  };

  const generateOrderId = () => {
    // Generate a random alphanumeric order ID
    const chars = "0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };

  const handleInputChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
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
                value={inputs.contact}
                onChange={handleInputChange}
                placeholder="enter your contact number here"
              ></input>
            </div>
            <div>
              <span>Address</span>
              <input
                type="text"
                name="address"
                value={inputs.address}
                readOnly
                onChange={handleInputChange}
                placeholder="click locate me to get your location"
              ></input>
            </div>
          </form>
          <button onClick={handleData} className="locateMe">
            <img src={Location} alt="location"></img> LOCATE ME
          </button>
          <button onClick={placeOrder} className="order">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
