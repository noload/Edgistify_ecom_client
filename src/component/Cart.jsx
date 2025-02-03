/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartAction";
import Swal from "sweetalert2";
import { createOrder, validatePayment } from "../redux/orderAction";
import Navbar from "./Navbar";

const CartPage = () => {
  const { cart, orderCost } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    dispatch(addToCart(updatedCart));

    Swal.fire({
      title: "Removed!",
      text: "Item has been removed from your cart.",
      icon: "warning",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    dispatch(addToCart(updatedCart));
  };

  const handleClearCart = () => {
    dispatch(addToCart([]));

    Swal.fire({
      title: "Cart Cleared!",
      text: "Your cart is now empty.",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  const handleCheckout = async () => {
    if (!address.trim()) {
      Swal.fire({
        title: "Address Required",
        text: "Please enter a shipping address",
        icon: "warning",
      });
      return;
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const orderData = {
        shippingAddress: address,
        orderCost,
        orderItems: cart.map(({ _id, title, quantity }) => ({
          _id,
          title,
          quantity,
        })),
      };
      const order = await dispatch(createOrder(orderData, token));

      const options = {
        key: "rzp_test_i7riLuinINPd9e",
        amount: order.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (paymentResponse) {
          try {
            // Validate Payment
            const paymentData = {
              orderCreationId: order.id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            };
            await dispatch(validatePayment(paymentData, token));

            Swal.fire({
              title: "Payment Successful",
              text: "Your order has been placed successfully!",
              icon: "success",
            });

            dispatch(addToCart([]));
          } catch (error) {
            Swal.fire({
              title: "Payment Failed",
              text: "Could not verify payment, please try again.",
              icon: "error",
            });
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#007bff",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while processing your payment.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="alert alert-info text-center">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="table-responsive shadow-sm p-3 bg-white rounded">
              <table className="table table-hover align-middle">
                <thead className="table-primary text-center">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="me-2 rounded"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <span>{item.title}</span>
                      </td>
                      <td className="fw-bold text-success">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="fw-bold">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(item._id, -1)}
                        >
                          ➖
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleQuantityChange(item._id, 1)}
                        >
                          ➕
                        </button>
                      </td>
                      <td className="fw-bold text-primary">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(item._id)}
                        >
                          ❌ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <button
                  className="btn btn-danger w-100"
                  onClick={handleClearCart}
                >
                  🗑️ Clear Cart
                </button>
              </div>
              <div className="col-md-6 text-end">
                <div className="card shadow-lg p-4 bg-light">
                  <h4 className="text-center text-dark mb-3">
                    📦 Order Summary
                  </h4>
                  <p>
                    <strong>Subtotal:</strong> ${orderCost.subTotal.toFixed(2)}
                  </p>
                  <p>
                    <strong>Rain Fee:</strong> ${orderCost.rainFee.toFixed(2)}
                  </p>
                  <p>
                    <strong>Platform Fee:</strong> $
                    {orderCost.platformFee.toFixed(2)}
                  </p>
                  <p>
                    <strong>Delivery Fee:</strong> $
                    {orderCost.deliveryFee.toFixed(2)}
                  </p>
                  <p>
                    <strong>Cart Fee:</strong> ${orderCost.cartFee.toFixed(2)}
                  </p>
                  <hr />
                  <h5 className="fw-bold text-danger">
                    Total: ${orderCost.totalCost.toFixed(2)}
                  </h5>
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your shipping address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={handleCheckout}
                  disabled={!address.trim()}
                >
                  ✅ Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
