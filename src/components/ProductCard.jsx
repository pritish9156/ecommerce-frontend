import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

  return (

    <motion.div
      whileHover={{
        y: -8
      }}
      className="card border-0 shadow h-100"
    >

      <div
        style={{
          overflow: "hidden"
        }}
      >

        <img
          src={
            product.imageUrl
              ? `http://localhost:8080/ecommerce-backend${product.imageUrl}`
              : "https://via.placeholder.com/400x300"
          }
          alt={product.name}
          className="card-img-top"
          style={{
            height: "250px",
            objectFit: "cover"
          }}
        />

      </div>

      <div className="card-body">

        <small
          className="text-muted"
        >
          {product.brandName}
        </small>

        <h5
          className="fw-bold mt-2"
        >
          {product.name}
        </h5>

        <div
          className="mb-2"
        >
          ⭐ {product.averageRating}
          {" "}
          ({product.reviewCount})
        </div>

        <h4
          className="text-success"
        >
          ₹{
            product.startingPrice
          }
        </h4>

        <Link
          to={`/product/${product.id}`}
          className="btn btn-dark w-100 mt-3"
        >
          View Details
        </Link>

      </div>

    </motion.div>
  );
}

export default ProductCard;