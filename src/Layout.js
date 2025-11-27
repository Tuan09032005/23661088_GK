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
                <Link to="/">Trang chủ</Link>
              </li>

              {isAdmin && (
                <li>
                  <Link to="/admin/products">Quản trị</Link>
                </li>
              )}

              <li>
                <Link to="/ListSanPham">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/trang1">Đồ linh tinh</Link>
              </li>
              <li>
                <Link to="/trang2">Thành Viên</Link>
              </li>
              <li>
                <Link to="/About">Về chúng tôi</Link>
              </li>

              {/* 🛒 GIỎ HÀNG */}
              <li>
                <Link
                  to="/cart"
                  className="menu-item"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  🛒 Giỏ hàng
                  {totalQuantity > 0 && (
                    <span
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                        marginLeft: "5px",
                      }}
                    >
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>

          {/* LOGO */}
          <div className="header-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          {/* LOGIN / USER INFO */}
          <div className="header-right">
            {user ? (
              <div className="user-info">
                <span>👤 {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* NAVBAR XANH */}
        <nav className="nav-blue">
          <ul>
            <li>
              <Link to="#">Menu 1</Link>
            </li>
            <li>
              <Link to="#">Menu 2</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Tuan 23661088</p>
      </footer>
    </div>
  );
};

export default Layout;
