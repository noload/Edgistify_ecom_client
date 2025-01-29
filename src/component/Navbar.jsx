import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const  dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleLogout = async () => {
    try {
  
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/'); 
  
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo" width="40" height="40" />
        </Link>
        <div className="navbar-nav d-flex flex-row me-auto mb-2 mb-lg-0">
          <Link className="nav-link active" aria-current="page" to="/products/all">
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
          <div className="modal-dialog d-flex justify-content-center align-items-center" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <FaExclamationTriangle className="text-danger mr-2" style={{ fontSize: "1.5rem" }} />
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
