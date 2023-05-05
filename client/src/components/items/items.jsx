import "./items.scss";
import BurgerList from "../../itemList/burgers";
import AppetizerList from "../../itemList/appetizes";
import BeverageList from "../../itemList/beverages";
import { useState } from "react";
export const Items = () => {
  const [counts, setCounts] = useState(
    Array(BurgerList.length + AppetizerList.length + BeverageList.length).fill(
      0
    )
  );

  const incrementCount = (index) => {
    const newCounts = [...counts];
    newCounts[index] = newCounts[index] + 1;
    setCounts(newCounts);
  };

  const decrementCount = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index] = newCounts[index] - 1;
      setCounts(newCounts);
    }
  };

  const getItemIndex = (item) => {
    const allItems = [...BurgerList, ...AppetizerList, ...BeverageList];
    return allItems.findIndex((i) => i.id === item.id);
  };

  const getItemCount = (index) => {
    return counts[index];
  };

  const addToCart = (item, count) => {
    if (count === 0) {
      alert("Quantity cannot be 0");
    } else {
      let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
      cartItems.push({ ...item, count });
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.location.reload();
    }
  };

  return (
    <div className="itemsMain">
      <h2 id="burgers">Burgers</h2>
      {BurgerList.map((item, index) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image1"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="price">
              <span className="lable">LKR </span>
              <span>{item.price}</span>
            </div>
            <div className="footer">
              <button
                className="calc"
                onClick={() => decrementCount(getItemIndex(item, index))}
              >
                -
              </button>
              <span>{getItemCount(getItemIndex(item, index))}</span>
              <button
                className="calc"
                onClick={() => incrementCount(getItemIndex(item, index))}
              >
                +
              </button>
              <button
                className="cart"
                onClick={() =>
                  addToCart(item, getItemCount(getItemIndex(item, index)))
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <h2 id="appetizes">Appetizers</h2>
      {AppetizerList.map((item, index) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image2"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="price">
              <span className="lable">LKR </span>
              <span>{item.price}</span>
            </div>
            <div className="footer">
              <button
                className="calc"
                onClick={() => decrementCount(getItemIndex(item, index))}
              >
                -
              </button>
              <span>{getItemCount(getItemIndex(item, index))}</span>
              <button
                className="calc"
                onClick={() => incrementCount(getItemIndex(item, index))}
              >
                +
              </button>
              <button
                className="cart"
                onClick={() =>
                  addToCart(item, getItemCount(getItemIndex(item, index)))
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
      <h2 id="beverages">Beverages</h2>
      {BeverageList.map((item, index) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image3"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="price">
              <span className="lable">LKR </span>
              <span>{item.price}</span>
            </div>
            <div className="footer">
              <button
                className="calc"
                onClick={() => decrementCount(getItemIndex(item, index))}
              >
                -
              </button>
              <span>{getItemCount(getItemIndex(item, index))}</span>
              <button
                className="calc"
                onClick={() => incrementCount(getItemIndex(item, index))}
              >
                +
              </button>
              <button
                className="cart"
                onClick={() =>
                  addToCart(item, getItemCount(getItemIndex(item, index)))
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
