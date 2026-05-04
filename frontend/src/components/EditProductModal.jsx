import { useState } from "react";
import { updateProduct } from "../services/product-api";
import "./EditProductModal.css";

function EditProductModal({ product, onClose, onUpdated }) {
  const [form, setForm] = useState({
    articleNo: product.articleNo,
    productService: product.productService,
    inPrice: product.inPrice,
    price: product.price,
    unit: product.unit,
    inStock: product.inStock,
    description: product.description,
  });
  const [error, setError] = useState("");

  function handleNumberKey(e) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    for (const key in form) {
      if (!form[key].toString().trim()) {
        setError("Please fill in all fields");
        return;
      }
    }

    await updateProduct(product.id, {
      ...form,
      articleNo: Number(form.articleNo),
      inPrice: Number(form.inPrice),
      price: Number(form.price),
      inStock: Number(form.inStock),
    });
    onUpdated();
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Article No</label>
          <input
            name="articleNo"
            value={form.articleNo}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Product / Service</label>
          <input
            name="productService"
            value={form.productService}
            onChange={handleChange}
          />

          <label>In Price</label>
          <input
            name="inPrice"
            value={form.inPrice}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Unit</label>
          <input name="unit" value={form.unit} onChange={handleChange} />

          <label>In Stock</label>
          <input
            name="inStock"
            value={form.inStock}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
