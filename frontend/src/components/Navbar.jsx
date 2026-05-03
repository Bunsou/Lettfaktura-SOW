import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

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
      <div ref={menuRef}>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu color="white" size={28} />
        </button>

        {menuOpen && (
          <div className="hamburger-menu">
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#order" onClick={() => setMenuOpen(false)}>
              Order
            </a>
            <a href="#our-customers" onClick={() => setMenuOpen(false)}>
              Our Customers
            </a>
            <a href="#about-us" onClick={() => setMenuOpen(false)}>
              About us
            </a>
            <a href="#contact-us" onClick={() => setMenuOpen(false)}>
              Contact Us
            </a>
          </div>
        )}
      </div>

      <img
        src="https://storage.123fakturera.se/public/icons/diamond.png"
        alt="logo"
        className="navbar-logo"
      />
      <div className="navbar-right">
        <nav className="navbar-links">
          <a href="#home">Home</a>
          <a href="#order">Order</a>
          <a href="#our-customers">Our Customers</a>
          <a href="#about-us">About us</a>
          <a href="#contact-us">Contact Us</a>
        </nav>

        <div className="lang-selector" ref={langRef}>
          <div className="lang-trigger" onClick={() => setLangOpen(!langOpen)}>
            <span>English</span>
            <img
              src="https://storage.123fakturere.no/public/flags/GB.png"
              alt="EN"
              className="lang-icon"
            />
          </div>

          {langOpen && (
            <div className="lang-dropdown">
              <div className="lang-option" onClick={() => setLangOpen(false)}>
                <span>Svenska</span>
                <img
                  src="https://storage.123fakturere.no/public/flags/SE.png"
                  alt="SE"
                  className="lang-icon"
                />
              </div>
              <div className="lang-option" onClick={() => setLangOpen(false)}>
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
