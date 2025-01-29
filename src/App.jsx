import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./component/Auth";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductPage from "./component/Product";
import ProductDetails from "./component/ProductDetail";
import CartPage from "./component/Cart";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetails />} /> 
          <Route path="/cart" element={<CartPage />} /> 

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
