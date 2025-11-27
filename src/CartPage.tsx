import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const navigate = useNavigate();
  const [confirmRemove, setConfirmRemove] = useState<number | null>(null); // 🔥 Popup xác nhận

  // --- GIỎ HÀNG TRỐNG ---
  if (cartItems.length === 0)
    return (
      <div style={styles.emptyContainer}>
        <h3>🛒 Giỏ hàng đang trống!</h3>
        <button onClick={() => navigate("/")} style={styles.secondaryButton}>
          ⬅ Quay lại mua hàng
        </button>
      </div>
    );

  // --- TRANG GIỎ HÀNG ---
  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: 20 }}>🛍 Giỏ hàng của bạn</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id}>
                <td style={styles.productCell}>
                  <img
                    src={item.product.image}
                    style={styles.productImage}
                    alt=""
                  />
                  <span>{item.product.title}</span>
                </td>
                <td style={styles.center}>${item.product.price}</td>
                <td style={styles.center}>
                  <div style={styles.qtyContainer}>
                    <button
                      onClick={() => decreaseQuantity(item.product.id)}
                      style={styles.qtyBtn}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.product.id)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td style={styles.center}>
                  <strong>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </strong>
                </td>
                <td style={styles.center}>
                  <button
                    onClick={() => setConfirmRemove(item.product.id)}
                    style={styles.deleteBtn}
                    title="Xóa sản phẩm"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- XÁC NHẬN XOÁ --- */}
      {confirmRemove !== null && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>Bạn có chắc muốn xóa sản phẩm này?</p>
            <button
              onClick={() => {
                removeFromCart(confirmRemove);
                setConfirmRemove(null);
              }}
              style={styles.primaryButton}
            >
              🗑️ Xóa
            </button>
            <button
              onClick={() => setConfirmRemove(null)}
              style={styles.secondaryButton}
            >
              ❌ Hủy
            </button>
          </div>
        </div>
      )}

      {/* --- KHU VỰC THANH TOÁN --- */}
      <div style={styles.checkoutSection}>
        <button onClick={() => navigate("/")} style={styles.secondaryButton}>
          ⬅ Tiếp tục mua hàng
        </button>
        <div style={{ textAlign: "right" }}>
          <h3>
            Tổng cộng:{" "}
            <span style={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </h3>
          <button
            onClick={() => navigate("/checkout")}
            style={styles.primaryButton}
          >
            💳 Đi đến thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: { padding: 30, maxWidth: 1000, margin: "0 auto" },
  emptyContainer: { textAlign: "center", marginTop: 80 },
  tableWrapper: { overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  productCell: { padding: 10, display: "flex", alignItems: "center", gap: 12 },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    objectFit: "contain",
  },
  center: { textAlign: "center", padding: 10 },
  qtyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontWeight: "bold",
  },
  deleteBtn: {
    color: "red",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
  },
  checkoutSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 30,
    paddingTop: 25,
    borderTop: "1px solid #e0e0e0",
  },
  totalPrice: { color: "#e63946", fontSize: "1.3em", fontWeight: "bold" },
  primaryButton: {
    padding: "12px 28px",
    background: "#0077b6",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
  },
  secondaryButton: {
    padding: "10px 22px",
    background: "white",
    color: "#333",
    border: "1px solid #bbb",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: 25,
    background: "white",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
};
