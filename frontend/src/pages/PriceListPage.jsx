import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../services/auth-api";
import PriceListHeader from "../components/PriceListHeader";
import PriceListSidebar from "../components/PriceListSidebar";
import ProductTable from "../components/ProductTable";
import "./PriceListPage.css";

const PriceListPage = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      if (!isAuthenticated) navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="pricelist-page">
      <PriceListHeader
        menuOpen={menuOpen}
        toggleMenu={() => setMenuOpen(!menuOpen)}
      />
      <div className="pricelist-body">
        <PriceListSidebar
          menuOpen={menuOpen}
          closeMenu={() => setMenuOpen(false)}
        />
        <ProductTable />
      </div>
    </div>
  );
};

export default PriceListPage;
