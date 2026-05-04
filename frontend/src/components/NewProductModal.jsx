import { useState } from "react";
import { createProduct } from "../services/product-api";
import "./NewProductModal.css";

function NewProductModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    articleNo: "",
    productService: "",
    inPrice: "",
    price: "",
    unit: "",
    inStock: "",
    description: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNumberKey(e) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
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

    await createProduct({
      ...form,
      articleNo: Number(form.articleNo),
      inPrice: Number(form.inPrice),
      price: Number(form.price),
      inStock: Number(form.inStock),
    });
    onCreated();
    onClose();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>New Product</h2>

        <form onSubmit={handleSubmit}>
          <label>Article No</label>
          <input
            name="articleNo"
            placeholder="e.g. 100001"
            value={form.articleNo}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Product / Service</label>
          <input
            name="productService"
            placeholder="e.g. Sample product"
            value={form.productService}
            onChange={handleChange}
          />

          <label>In Price</label>
          <input
            name="inPrice"
            placeholder="e.g. 10000"
            value={form.inPrice}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Price</label>
          <input
            name="price"
            placeholder="e.g. 25000"
            value={form.price}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Unit</label>
          <input
            name="unit"
            placeholder="e.g. kilometers/hour"
            value={form.unit}
            onChange={handleChange}
          />

          <label>In Stock</label>
          <input
            name="inStock"
            placeholder="e.g. 270980"
            value={form.inStock}
            onChange={handleChange}
            onKeyDown={handleNumberKey}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Short description"
            value={form.description}
            onChange={handleChange}
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProductModal;
