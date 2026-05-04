import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import "./Navbar.css";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { t, lang, changeLanguage } = useLanguage();

  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left" ref={menuRef}>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu color="white" size={28} />
        </button>

        {menuOpen && (
          <div className="hamburger-menu">
            <a href="#home" onClick={() => setMenuOpen(false)}>
              {t("home")}
            </a>
            <a href="#order" onClick={() => setMenuOpen(false)}>
              {t("order")}
            </a>
            <a href="#our-customers" onClick={() => setMenuOpen(false)}>
              {t("our_customers")}
            </a>
            <a href="#about-us" onClick={() => setMenuOpen(false)}>
              {t("about_us")}
            </a>
            <a href="#contact-us" onClick={() => setMenuOpen(false)}>
              {t("contact_us")}
            </a>
          </div>
        )}
        <img
          src="https://storage.123fakturera.se/public/icons/diamond.png"
          alt="logo"
          className="navbar-logo"
        />
      </div>

      <div className="navbar-right">
        <nav className="navbar-links">
          <a href="#home">{t("home")}</a>
          <a href="#order">{t("order")}</a>
          <a href="#our-customers">{t("our_customers")}</a>
          <a href="#about-us">{t("about_us")}</a>
          <a href="#contact-us">{t("contact_us")}</a>
        </nav>

        <div className="lang-selector" ref={langRef}>
          <div className="lang-trigger" onClick={() => setLangOpen(!langOpen)}>
            <span>{lang === "sv" ? "Svenska" : "English"}</span>
            <img
              src={`https://storage.123fakturere.no/public/flags/${lang === "sv" ? "SE" : "GB"}.png`}
              alt={lang}
              className="lang-icon"
            />
          </div>

          {langOpen && (
            <div className="lang-dropdown">
              <div
                className="lang-option"
                onClick={() => {
                  changeLanguage("sv");
                  setLangOpen(false);
                }}
              >
                <span>Svenska</span>
                <img
                  src="https://storage.123fakturere.no/public/flags/SE.png"
                  alt="SE"
                  className="lang-icon"
                />
              </div>

              <div
                className="lang-option"
                onClick={() => {
                  changeLanguage("en");
                  setLangOpen(false);
                }}
              >
                <span>English</span>
                <img
                  src="https://storage.123fakturere.no/public/flags/GB.png"
                  alt="EN"
                  className="lang-icon"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
