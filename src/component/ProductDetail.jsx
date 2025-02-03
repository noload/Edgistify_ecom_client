import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartAction";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { loading, error, items } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const [isExistInCart, setIsExistInCart] = useState(false);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const navigator = useNavigate();

  useEffect(() => {
    setProduct(items.find((item) => item._id === id));
    const exist = cart.find((item) => item._id == id);
    if (exist) {
      setIsExistInCart(true);
    }
  }, [id, items, isExistInCart, cart]);

  useEffect(() => {
    const productDetails = items.find((item) => item._id === id);
    if (productDetails) setProduct(productDetails);
  }, [id, items]);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const viewCart = () => {
    navigator("/cart");
  };
  const handleAddToCart = () => {
    let cartItems = [...cart];
    const productIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (productIndex !== -1) {
      cartItems[productIndex] = {
        ...cartItems[productIndex],
        quantity: cartItems[productIndex].quantity + quantity,
      };
    } else {
      cartItems.push({ ...product, quantity });
    }

    dispatch(addToCart(cartItems));

    Swal.fire({
      title: "✅ Added to Cart!",
      text: `${product.title} (${quantity} item${
        quantity > 1 ? "s" : ""
      }) added to your cart.`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {product ? (
          <div className="row shadow-lg p-4 bg-white rounded">
            <div className="col-lg-6 text-center">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold text-dark">{product.title}</h2>
              <p className="text-muted">{product.description}</p>
              <h4 className="fw-bold text-danger">
                ${product.price.toFixed(2)}
              </h4>

              <div className="d-flex align-items-center my-3">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => handleQuantityChange(-1)}
                >
                  ➖
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  style={{ width: "60px" }}
                />
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => handleQuantityChange(1)}
                >
                  ➕
                </button>
              </div>

              <button
                className="btn btn-primary w-100 py-2 mt-2"
                onClick={isExistInCart ? viewCart : handleAddToCart}
              >
                {isExistInCart ? " 🛒 view  cart" : "🛒 Add to Cart"}
              </button>
            </div>
          </div>
        ) : (
          <div className="col-12 text-center my-5">
            <h5 className="text-muted">Product not found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
