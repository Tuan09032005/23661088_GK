import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  // 🔒 Xác định admin
  const isAdmin = user && user.role === "admin";

  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <div className="top-bar">
          <nav className="menu-left">
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>

              {/* Chỉ hiện Quản trị nếu admin */}
              {isAdmin && (
                <li>
                  <a href="/admin/products">Quản trị</a>
                </li>
              )}

              <li>
                <a href="/ListSanPham">Sản phẩm</a>
              </li>
              <li>
                <a href="/trang1">Đồ linh tinh</a>
              </li>
              <li>
                <a href="/trang2">Thành Viên</a>
              </li>
              <li>
                <a href="/About">Về chúng tôi</a>
              </li>
            </ul>
          </nav>

          <div className="header-center">
            <a href="/">
              <img src={logo} alt="Logo" className="logo" />
            </a>
          </div>

          <div className="header-right">
            {user ? (
              <div className="user-info">
                <span>👤 {user.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <a href="/login" className="login-btn">
                Đăng nhập
              </a>
            )}
          </div>
        </div>

        {/* NAVBAR XANH tạm */}
        <nav className="nav-blue">
          <ul>
            <li>
              <a href="#">Menu 1</a>
            </li>
            <li>
              <a href="#">Menu 2</a>
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
