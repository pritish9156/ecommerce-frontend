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
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBrands from "./pages/admin/AdminBrands";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminVariants from "./pages/admin/AdminVariants";
import AdminImages from "./pages/admin/AdminImages";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRoute from "./components/AdminRoute";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import BuyNow from "./pages/BuyNow";
import AdminPayments from "./pages/admin/AdminPayments.jsx";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails.jsx";

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

      <Route
          path="/orders/:id"
          element={
              <ProtectedRoute>
                  <OrderDetails />
              </ProtectedRoute>
          }
      />

      <Route
          path="/wishlist"
          element={
              <ProtectedRoute>
                  <Wishlist />
              </ProtectedRoute>
          }
      />

      <Route
        path="/buy-now/:variantId"
        element={
            <ProtectedRoute>
                <BuyNow />
            </ProtectedRoute>
        }
    />

      <Route
        path="/admin"
        element={
            <AdminRoute>

                <AdminLayout />

            </AdminRoute>
        }
    >

        <Route
            path="dashboard"
            element={<AdminDashboard />}
        />

        <Route
            path="brands"
            element={<AdminBrands />}
        />

        <Route
            path="products"
            element={<AdminProducts />}
        />

        <Route
            path="variants"
            element={<AdminVariants />}
        />

        <Route
            path="images"
            element={<AdminImages />}
        />

        <Route
            path="orders"
            element={<AdminOrders />}
        />

        <Route
            path="users"
            element={<AdminUsers />}
        />

        <Route
            path="/admin/payments"
            element={
                <AdminPayments />
            }
        />

        <Route
            path="/admin/coupons"
            element={
                <AdminCoupons />
            }
        />

        <Route
            path="/admin/orders/:id"
            element={
                <AdminOrderDetails/>
            }
        />

      </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;