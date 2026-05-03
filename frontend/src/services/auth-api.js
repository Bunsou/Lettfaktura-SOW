const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  return { status: res.status, data };
}

export async function checkAuth() {
  try {
    const res = await fetch(`${API_URL}/user/me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}
