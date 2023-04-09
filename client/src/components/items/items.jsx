import "./items.scss";
import BurgerList from "../../itemList/burgers"
import AppetizerList from "../../itemList/appetizes";
import BeverageList from "../../itemList/beverages";
export const Items = () => {
  return (
    <div className="itemsMain">
      <h2 id="burgers">Burgers</h2>
      {BurgerList.map((item) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="footer">
              <span>{item.price}</span>
              <button>Add to cart</button>
            </div>
            <span className="tc">t&c apply</span>
          </div>
        </div>
      ))}
      <h2 id="appetizes">Appetizers</h2>
      {AppetizerList.map((item) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="footer">
              <span>{item.price}</span>
              <button>Add to cart</button>
            </div>
            <span className="tc">t&c apply</span>
          </div>
        </div>
      ))}
      <h2 id="beverages">Beverages</h2>
      {BeverageList.map((item) => (
        <div key={item.id} className="card">
          <div className="header">
            <img src={item.image} alt="item image"></img>
          </div>
          <div className="itemBody">
            <span className="title">{item.name}</span>
            <p>{item.description}</p>
            <div className="footer">
              <span>{item.price}</span>
              <button>Add to cart</button>
            </div>
            <span className="tc">t&c apply</span>
          </div>
        </div>
      ))}
    </div>
  );
};
