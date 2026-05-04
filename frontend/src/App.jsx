import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PriceListPage from "./pages/PriceListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricelist" element={<PriceListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
