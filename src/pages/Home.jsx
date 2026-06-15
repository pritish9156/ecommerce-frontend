import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)",
          color: "white"
        }}
      >

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="display-3 fw-bold"
              >
                Shop Smarter.
                <br />
                Live Better.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="lead mt-4"
              >
                Experience next-generation online shopping
                with premium products, smart search,
                personalized recommendations and lightning
                fast delivery.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-warning btn-lg mt-3"
                onClick={() => navigate("/products")}
              >
                Explore Products
              </motion.button>

            </div>

            <div className="col-lg-6 text-center">

              <motion.img
                initial={{
                  opacity: 0,
                  x: 100
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  duration: 1
                }}
                src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                alt="Shopping"
                className="img-fluid"
                style={{
                  maxHeight: "500px"
                }}
              />

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;