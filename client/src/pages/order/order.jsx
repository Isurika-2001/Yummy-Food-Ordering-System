import "./order.scss";
export const Order = () => {
  // Get orders from the local storage
  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="Main">
      <h1>My Orders</h1>
      {storedOrders.map((order) => (
        <div key={order.orderId} className="card">
          <div className="itemBody">
            <div className="header">
              <div className="lb">
                <span>Order id: </span>
                <span>Date: </span>
              </div>
              <div className="val">
                <span>{order.orderId}</span>
                <span>{order.date}</span>
              </div>
            </div>
            <div className="customer">
              <span className="customerPhone">{order.customer.contact}</span>
              <span className="customerAddress">{order.customer.address}</span>
            </div>
            <hr></hr>
            <div className="orderDetails">
              <div className="head">
                <span className="itemN">Item Name</span>
                <span className="qty">Qty</span>
                <span>Price</span>
              </div>
              {order.items.map((item) => (
                <div className="itemDetails" key={item.id}>
                  <span className="itemN">{item.name}</span>
                  <span>{item.count}</span>
                  <span>{item.price}.00</span>
                </div>
              ))}
              <div className="footer">
                <span>Total: </span>
                <span>{order.total}.00</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
