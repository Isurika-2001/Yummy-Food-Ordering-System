import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register"
import { ViewItems } from "./pages/view_items/view_items";
import { Home } from "./pages/home/home";
import { Order } from "./pages/order/order";
import { Contactus } from "./pages/contactus/contactus";
import { NavBar } from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/profile/profile"
import { Cart } from "./pages/cart/cart";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<ViewItems />} />
            <Route path="/myorders" element={<Order />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
