import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import anhlogo1 from "./assets/images/melody.jpg";
import "./assets/css/login.css";
import { supabase } from "./supabaseClient";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert(" Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);

    try {
      // 🚀 1️⃣ Truy vấn người dùng theo username
      const { data: userData, error } = await supabase
        .from("tbl_user")
        .select(
          `
          id, username, password_hash, fullname, email,
          tbl_roles(role_name)
        `
        )
        .eq("username", username)
        .single();

      if (error || !userData) {
        alert("❌ Tên đăng nhập không tồn tại!");
        setLoading(false);
        return;
      }
      const sha256 = async (text) => {
        const buf = await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(text)
        );
        return Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
      };

      const hashInput = await sha256(password);

      if (hashInput !== userData.password_hash) {
        alert("❌ Mật khẩu không đúng!");
        setLoading(false);
        return;
      }
      const role = userData.tbl_roles?.role_name || "user";

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          username: userData.username,
          fullname: userData.fullname,
          role,
        })
      );

      alert(`✅ Đăng nhập thành công! Xin chào ${userData.fullname}`);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("⚠️ Lỗi hệ thống khi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />

        <h2 className="login-title">Đăng nhập vào tài khoản</h2>
        <p className="login-subtitle">Sử dụng tài khoản của bạn để tiếp tục</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Bạn chưa có tài khoản? <a href="#">Tạo tài khoản mới</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
