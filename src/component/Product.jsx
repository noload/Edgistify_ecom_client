import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; 
import Navbar from "./Navbar";
import { fetchProducts } from "../redux/productActions";

const ProductPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (category) {
      dispatch(fetchProducts(category, token));
    }
  }, [category, dispatch, token]);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
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

        <div className="row justify-content-center">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex align-items-stretch"
                key={product._id}
              >
                <div
                  className="card shadow border-0 rounded-4 w-100 overflow-hidden"
                  style={{ transition: "0.3s ease-in-out", cursor: "pointer" }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top rounded-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{product.title}</h5>
                    <p className="card-text fw-bold text-danger">${product.price.toFixed(2)}</p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => handleViewDetails(product._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5">
              <h5 className="text-muted">No products found in this category</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
