import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 👇 Hiệu ứng header fade-in
    const header = document.querySelector(".header");
    if (header) {
      header.classList.add("fade-in");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isAdmin = user && user.role === "admin";

  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <div className="top-bar">
          <nav className="menu-left">
            <ul>
              <li>
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>

              {isAdmin && (
                <li>
                  <Link className="nav-link" to="/admin/products">
                    Quản trị
                  </Link>
                </li>
              )}

              <li>
                <Link className="nav-link" to="/ListSanPham">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/trang1">
                  Đồ linh tinh
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/trang2">
                  Thành Viên
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/About">
                  Về chúng tôi
                </Link>
              </li>

              {/* 🛒 GIỎ HÀNG */}
              <li>
                <Link
                  to="/cart"
                  className="menu-item nav-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  🛒 Giỏ hàng
                  {totalQuantity > 0 && (
                    <span className="cart-badge">{totalQuantity}</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* LOGO */}
          <div className="header-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo hover-scale" />
            </Link>
          </div>

          {/* LOGIN / USER INFO */}
          <div className="header-right">
            {user ? (
              <div className="user-info">
                <span>👤 {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="logout-btn hover-scale"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-btn hover-scale">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* NAVBAR XANH */}
        <nav className="nav-blue">
          <ul>
            <li>
              <Link className="nav-link" to="#">
                Menu 1
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="#">
                Menu 2
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer fade-in">
        <p>© 2025 Tuan 23661088</p>
      </footer>
    </div>
  );
};

export default Layout;
