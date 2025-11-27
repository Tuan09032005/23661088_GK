// src/ListProduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const ListProduct = () => {
  const [listproduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart(); // <-- Lấy hàm addToCart từ Context

  useEffect(() => {
    const LayDulieutuBackend = async () => {
      try {
        const res = await axios.get(
          "https://68f999c7ef8b2e621e7ccc40.mockapi.io/hce"
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setListProduct(res.data);
        } else {
          setError("Không có dữ liệu sản phẩm!");
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err.message || err);
        setError("Không thể tải dữ liệu từ máy chủ!");
      } finally {
        setLoading(false);
      }
    };

    LayDulieutuBackend();
  }, []);

  if (loading)
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  if (error)
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  const handleAddToCart = (e, product) => {
    // ngăn sự kiện click lan ra container (không navigate)
    e.stopPropagation();

    addToCart(product);
    // Thông báo đơn giản — bạn có thể thay bằng toast
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Banner nhỏ */}
      <div
        style={{
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 18,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1500&q=80"
          alt="banner"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            filter: "brightness(85%)",
          }}
        />
        <div
          style={{ position: "absolute", left: 24, bottom: 20, color: "#fff" }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 700,
              textShadow: "0 3px 8px rgba(0,0,0,0.5)",
            }}
          >
            Siêu khuyến mãi hôm nay — Mua ngay kẻo lỡ!
          </h2>
          <p
            style={{
              margin: "6px 0 0",
              textShadow: "0 2px 6px rgba(0,0,0,0.45)",
            }}
          >
            Giao nhanh, hỗ trợ trả góp, bảo hành chính hãng
          </p>
        </div>
      </div>

      <h2 style={{ marginBottom: 16 }}>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {listproduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            role="button"
            tabIndex={0}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 12,
              padding: 12,
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 340,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/sanpham/${p.id}`);
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: 8,
                  background: "#f7f7f7",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              <h4
                style={{ margin: "12px 6px 6px", fontSize: 16, minHeight: 44 }}
              >
                {p.title}
              </h4>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{ color: "#e63946", fontWeight: 700, fontSize: 16 }}
                >
                  ${p.price}
                </span>
                {p.originalPrice && (
                  <small
                    style={{ textDecoration: "line-through", color: "#999" }}
                  >
                    ${p.originalPrice}
                  </small>
                )}
              </div>

              <div style={{ marginTop: 8 }}>
                <small style={{ color: "#777" }}>
                  ⭐ {p.rating_rate ?? "—"} &nbsp;|&nbsp; ({p.rating_count ?? 0}{" "}
                  đánh giá)
                </small>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={(e) => handleAddToCart(e, p)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 6px 12px rgba(0,123,255,0.15)",
                  transition: "transform 0.12s ease, background 0.12s",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.99)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#007bff")
                }
              >
                🛒 Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
