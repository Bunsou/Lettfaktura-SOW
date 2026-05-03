const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTranslations(lang) {
  const res = await fetch(`${API_URL}/translations/${lang}`);
  const data = await res.json();
  return data.data;
}
