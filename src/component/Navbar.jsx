import { Link, useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="data:image/jpeg;base64,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"
            alt="Logo"
            width="40px"
            height="40px"
          />
        </Link>
        <div className="navbar-nav d-flex flex-row me-auto mb-2 mb-lg-0">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/products/all"
          >
            Home
          </Link>
          <Link className="nav-link" to="/products/men">
            Men
          </Link>
          <Link className="nav-link" to="/products/women">
            Women
          </Link>
          <Link className="nav-link" to="/products/electronics">
            Electronics
          </Link>
          <Link className="nav-link" to="/products/jewelery">
            Jewelery
          </Link>
        </div>

        <div className="d-flex align-items-center">
          <form className="d-flex mx-3">
            <input
              className="form-control me-2 rounded-pill shadow-sm"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                width: "300px",
              }}
            />
          </form>

          <div className="d-flex justify-content-between gap-4 align-items-center">
            <Link className="nav-link position-relative" to="/cart">
              <FaShoppingCart size={30} />
              {cart.length > 0 && (
                <span
                  className="badge rounded-circle bg-danger position-absolute"
                  style={{
                    top: "-5px",
                    right: "-5px",
                    padding: "5px 10px",
                    fontSize: "12px",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </Link>
            <button className="nav-link" onClick={toggleModal}>
              <FaUserCircle size={40} />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            inset: "0",
            zIndex: 1050,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog d-flex justify-content-center align-items-center"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <FaExclamationTriangle
                  className="text-danger mr-2"
                  style={{ fontSize: "1.5rem" }}
                />
                <h5 className="modal-title" id="exampleModalLabel">
                  Are you sure you want to logout?
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
