import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { login, register } from "../redux/authActions";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, isUserRegistered } = useSelector(
    (state) => state.auth
  );
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ fullName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(register(formData.email, formData.password, formData.fullName));
    } else {
      dispatch(login(formData.email, formData.password));
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/products/all");
    } else if (isUserRegistered) {
      Swal.fire("Success!", "User Registered successfully", "success");
      Swal.fire({
        title: "✅ User Registered successfully!",
        text: `${formData.fullName} happy journey`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    }
    if (error) {
      const { message } = JSON.parse(JSON.stringify(error));
      Swal.fire({
        title: "Something went wrong",
        text: message,
        timer: 2000,
        icon: "error",
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    }
  }, [isAuthenticated, error, isUserRegistered]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-light-blue">
      <div
        className="card shadow-lg p-5 rounded-4"
        style={{
          width: "400px",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#ffffff",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <h3 className="text-center fw-bold mb-4 text-primary">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h3>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label className="form-label text-muted">Full Name</label>
              <input
                type="text"
                className="form-control rounded-3 shadow-sm"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="form-label text-muted">Email</label>
            <input
              type="email"
              className="form-control rounded-3 shadow-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted">Password</label>
            <input
              type="password"
              className="form-control rounded-3 shadow-sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-3 fw-bold"
            disabled={loading}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-muted">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="btn btn-link text-decoration-none"
            onClick={toggleForm}
            style={{ fontWeight: "600", color: "#007bff" }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
