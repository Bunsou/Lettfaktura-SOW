import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Printer,
  MoreHorizontal,
  ToggleLeft,
} from "lucide-react";
import "./ProductTable.css";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../services/product-api";
import NewProductModal from "./NewProductModal";
import { useDebounce } from "../hooks/useDebounce";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const debouncedArticle = useDebounce(searchArticle, 300);
  const debouncedProduct = useDebounce(searchProduct, 300);

  const numberFields = ["articleNo", "inPrice", "price", "inStock"];
  async function handleFieldBlur(id, field, newValue, oldValue) {
    if (newValue === oldValue.toString()) return;

    const value = numberFields.includes(field) ? Number(newValue) : newValue;

    await updateProduct(id, { [field]: value });

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  }

  async function loadProducts() {
    const data = await fetchProducts();
    setProducts(data);
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    setOpenMenuId(null);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleNumberKey(e) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  }

  const filteredProducts = products
    .filter(
      (p) =>
        p.articleNo.toString().includes(debouncedArticle) &&
        p.productService.toLowerCase().includes(debouncedProduct.toLowerCase()),
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <div className="product-table-container">
      {openMenuId && (
        <div className="overlay" onClick={() => setOpenMenuId(null)} />
      )}
      <div className="toolbar">
        <div className="search-group">
          <div className="search-input">
            <input
              placeholder="Search Article No..."
              value={searchArticle}
              onChange={(e) => setSearchArticle(e.target.value)}
              onKeyDown={handleNumberKey}
            />
            <Search size={16} />
          </div>

          <div className="search-input">
            <input
              placeholder="Search Product..."
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Search size={16} />
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn" onClick={() => setShowModal(true)}>
            <span className="btn-text">New Product</span>
            <Plus size={14} color="green" />
          </button>

          <button className="action-btn">
            <span className="btn-text">Print List</span>
            <Printer size={14} color="cyan" />
          </button>

          <button className="action-btn">
            <span className="btn-text">Advanced mode</span>
            <ToggleLeft size={16} color="blue" />
          </button>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th className="col-arrow"></th>
            <th className="col-article">Article No.</th>
            <th className="col-product">Product/Service</th>
            <th className="col-in-price">In Price</th>
            <th className="col-price">Price</th>
            <th className="col-unit">Unit</th>
            <th className="col-in-stock">In Stock</th>
            <th className="col-description">Description</th>
            <th className="col-action"></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={`${product.id}-${product.updatedAt}`}>
              <td className="col-arrow">
                <span className="row-arrow">→</span>
              </td>
              <td className="col-article">
                <input
                  defaultValue={product.articleNo}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "articleNo",
                      e.target.value,
                      product.articleNo,
                    )
                  }
                  onKeyDown={handleNumberKey}
                />
              </td>
              <td className="col-product">
                <input
                  defaultValue={product.productService}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "productService",
                      e.target.value,
                      product.productService,
                    )
                  }
                />
              </td>
              <td className="col-in-price">
                <input
                  defaultValue={product.inPrice}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "inPrice",
                      e.target.value,
                      product.inPrice,
                    )
                  }
                  onKeyDown={handleNumberKey}
                />
              </td>
              <td className="col-price">
                <input
                  defaultValue={product.price}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "price",
                      e.target.value,
                      product.price,
                    )
                  }
                  onKeyDown={handleNumberKey}
                />
              </td>
              <td className="col-unit">
                <input
                  defaultValue={product.unit}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "unit",
                      e.target.value,
                      product.unit,
                    )
                  }
                />
              </td>
              <td className="col-in-stock">
                <input
                  defaultValue={product.inStock}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "inStock",
                      e.target.value,
                      product.inStock,
                    )
                  }
                  onKeyDown={handleNumberKey}
                />
              </td>
              <td className="col-description">
                <input
                  defaultValue={product.description}
                  onBlur={(e) =>
                    handleFieldBlur(
                      product.id,
                      "description",
                      e.target.value,
                      product.description,
                    )
                  }
                />
              </td>
              <td className="col-action">
                <div className="action-menu-wrapper">
                  <MoreHorizontal
                    size={18}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === product.id ? null : product.id,
                      )
                    }
                  />

                  {openMenuId === product.id && (
                    <div className="row-dropdown">
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <NewProductModal
          onClose={() => setShowModal(false)}
          onCreated={loadProducts}
        />
      )}
    </div>
  );
}

export default ProductTable;
