import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListSanPham = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://68f999c7ef8b2e621e7ccc40.mockapi.io/hce"
        );

        // Kiểm tra xem dữ liệu có phải là một mảng và không rỗng
        if (Array.isArray(res.data) && res.data.length > 0) {
          setListProduct(res.data);
        } else {
          setError("Không có dữ liệu sản phẩm.");
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err.message);
        setError("Không thể tải dữ liệu từ máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {listProduct.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/sanpham/${product.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                height: "180px",
                objectFit: "contain",
                width: "100%",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSanPham;
