import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 🎯 Banner */}
      <div
        style={{
          width: "100%",
          height: "280px",
          borderRadius: "15px",
          overflow: "hidden",
          marginBottom: "25px",
          position: "relative",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1498049860654-af1a5c566876"
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(80%)",
          }}
        />
        <h2
          style={{
            position: "absolute",
            bottom: "25px",
            left: "30px",
            color: "white",
            fontSize: "2.2rem",
            fontWeight: "700",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          🎁 Ưu đãi hấp dẫn - Mua ngay hôm nay!
        </h2>
      </div>

      {/* 🛍️ Danh sách sản phẩm */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Danh sách sản phẩm
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "15px",
              textAlign: "center",
              cursor: "pointer",
              background: "white",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "230px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>

            <h4
              style={{
                margin: "12px 0 5px",
                fontSize: "1.05rem",
                fontWeight: "600",
              }}
            >
              {p.title}
            </h4>
            <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
              ${p.price}
            </p>
            <small style={{ color: "#555" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>

            <button
              onClick={(e) => handleAddToCart(e, p)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "12px",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ListProducts_SP;
