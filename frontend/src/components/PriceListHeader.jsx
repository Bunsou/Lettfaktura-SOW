import "./PriceListHeader.css";
import userProfile from "../assets/user-profile.png";
import { Menu } from "lucide-react";

function PriceListHeader({ toggleMenu }) {
  return (
    <header className="header">
      <div className="header-hamburger-menu">
        <button className="header-hamburger-menu" onClick={toggleMenu}>
          <Menu color="white" size={28} />
        </button>
      </div>

      <div className="user-info">
        <div className="avatar">
          <img src={userProfile} alt="user" />
        </div>
        <div className="user-text">
          <span className="user-name">John Andre</span>
          <span className="user-company">Storfjord AS</span>
        </div>
      </div>

      <div className="lang">
        <span>English</span>
        <img
          src="https://storage.123fakturere.no/public/flags/GB.png"
          alt="EN"
          className="lang-icon"
        />
      </div>
    </header>
  );
}

export default PriceListHeader;
