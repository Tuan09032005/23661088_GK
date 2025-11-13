import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./assets/css/quanlisp.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
  });

  // 🔹 Lấy danh sách sản phẩm
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("product1")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error("Lỗi khi tải sản phẩm:", error.message);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Xử lý input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // 🔹 Thêm sản phẩm
  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("product1").insert([newProduct]);
    if (error) alert("❌ Lỗi thêm sản phẩm: " + error.message);
    else {
      alert("✅ Thêm sản phẩm thành công!");
      setNewProduct({
        title: "",
        price: "",
        image: "",
        rating_rate: "",
        rating_count: "",
      });
      fetchProducts();
    }
  };

  // 🔹 Cập nhật sản phẩm
  const handleEdit = async (e) => {
    e.preventDefault();
    const { id, ...updated } = editingProduct;
    const { error } = await supabase
      .from("product1")
      .update(updated)
      .eq("id", id);
    if (error) alert("❌ Lỗi cập nhật: " + error.message);
    else {
      alert("✅ Cập nhật thành công!");
      setEditingProduct(null);
      fetchProducts();
    }
  };

  // 🔹 Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      const { error } = await supabase.from("product1").delete().eq("id", id);
      if (error) alert("❌ Lỗi khi xóa: " + error.message);
      else fetchProducts();
    }
  };

  return (
    <div className="container">
      <h2>Quản lý sản phẩm (Admin)</h2>

      {/* Form thêm/sửa sản phẩm */}
      <form className="form" onSubmit={editingProduct ? handleEdit : handleAdd}>
        <input
          type="text"
          name="title"
          placeholder="Tên sản phẩm"
          value={editingProduct ? editingProduct.title : newProduct.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL hình ảnh"
          value={editingProduct ? editingProduct.image : newProduct.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating_rate"
          step="0.1"
          placeholder="Đánh giá (0–5)"
          value={
            editingProduct ? editingProduct.rating_rate : newProduct.rating_rate
          }
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating_count"
          placeholder="Số lượt đánh giá"
          value={
            editingProduct
              ? editingProduct.rating_count
              : newProduct.rating_count
          }
          onChange={handleChange}
        />

        <div className="actions">
          {editingProduct && (
            <button
              type="button"
              className="btn gray"
              onClick={() => setEditingProduct(null)}
            >
              Hủy
            </button>
          )}
          <button type="submit" className="btn blue">
            {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
        </div>
      </form>

      {/* Bảng sản phẩm */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Đánh giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.image} alt={p.title} className="thumb" />
              </td>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>
                ⭐ {p.rating_rate} ({p.rating_count})
              </td>
              <td>
                <button
                  className="btn yellow"
                  onClick={() => setEditingProduct(p)}
                >
                  Sửa
                </button>
                <button className="btn red" onClick={() => handleDelete(p.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
