const API_URL = import.meta.env.VITE_API_URL;

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.data;
}

export async function createProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
}
