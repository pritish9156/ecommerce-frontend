import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile.jsx";
import Addresses from "./pages/Addresses";

function App() {
  return (
    <BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
            path="/profile"
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            }
        />

        <Route
          path="/addresses"
          element={
              <ProtectedRoute>
                  <Addresses />
              </ProtectedRoute>
          }
      />

      </Routes>

    </BrowserRouter>
  );
}

export default App;