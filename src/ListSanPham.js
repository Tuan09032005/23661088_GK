import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // ⭐ Import để dùng addToCart

const ListSanPham = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart(); // ⭐ Lấy addToCart từ context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://68f999c7ef8b2e621e7ccc40.mockapi.io/hce"
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setListProduct(res.data);
        } else {
          setError("Không có dữ liệu sản phẩm.");
        }
      } catch (err) {
        setError("Không thể tải dữ liệu từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // ⛔ Chặn navigate khi bấm nút
    addToCart(product);
    alert(`🛒 Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "24px" }}>
      {/* 🔥 Banner */}
      <div
        style={{
          marginBottom: "20px",
          height: "220px",
          backgroundImage: `url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1500&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "30px",
          color: "white",
          fontSize: "26px",
          fontWeight: "bold",
          textShadow: "0 4px 10px rgba(0,0,0,0.6)",
        }}
      >
        🔥 Giảm giá sốc hôm nay – Mua ngay kẻo lỡ!
      </div>

      <h2 style={{ marginBottom: "16px" }}>📦 Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {listProduct.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/detail/${product.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "14px",
              textAlign: "center",
              cursor: "pointer",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                height: "200px",
                width: "100%",
                objectFit: "contain",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />

            <h4
              style={{
                fontSize: "16px",
                fontWeight: "600",
                minHeight: "48px",
                marginBottom: "6px",
              }}
            >
              {product.title}
            </h4>

            <p
              style={{ color: "#e63946", fontWeight: "bold", margin: "6px 0" }}
            >
              ${product.price}
            </p>

            {/* ⭐ Nút thêm giỏ hàng */}
            <button
              onClick={(e) => handleAddToCart(e, product)}
              style={{
                marginTop: "10px",
                padding: "10px",
                width: "100%",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background 0.25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#0056b3";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#007bff";
              }}
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSanPham;
