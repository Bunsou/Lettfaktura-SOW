import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { loginUser, checkAuth } from "../services/auth-api";
import { useLanguage } from "../context/LanguageContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      if (isAuthenticated) navigate("/pricelist");
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setServerError("");

    if (!email) {
      setEmailError(t("email_is_required"));
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setEmailError(t("please_enter_a_valid_email_address"));
      return;
    }

    if (!password) {
      setPasswordError(t("this_field_cannot_be_empty"));
      return;
    }

    if (password.length < 4) {
      setPasswordError(t("this_field_must_be_at_least_4_characters_long"));
      return;
    }

    try {
      const { status, data } = await loginUser(email, password);

      if (data.success) {
        navigate("/pricelist");
      } else if (status === 500) {
        setServerError(t("something_went_wrong_with_our_server"));
      } else {
        setServerError(t("invalid_email_or_password"));
      }
    } catch (err) {
      setServerError(t("something_went_wrong_with_our_server"));
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <div className="login-card">
          <h1 className="login-title">{t("log_in")}</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>{t("enter_your_email_address")}</label>
              <input
                type="email"
                placeholder={t("email_address")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-group">
              <label>{t("enter_your_password")}</label>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff color="gray" size={28} />
                  ) : (
                    <Eye color="gray" size={28} />
                  )}
                </span>
              </div>
              {passwordError && <p className="error">{passwordError}</p>}
            </div>

            {serverError && <p className="server-error">{serverError}</p>}
            <button type="submit" className="login-button">
              {t("log_in")}
            </button>
          </form>

          <div className="card-links">
            <a href="#register">{t("register")}</a>
            <a href="#forgot-password">{t("forgotten_password")}</a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-top">
          <span>123 Fakturera</span>
          <div className="footer-links">
            <a href="#home">{t("home")}</a>
            <a href="#order">{t("order")}</a>
            <a href="#contact-us">{t("contact_us")}</a>
          </div>
        </div>
        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © Lättfaktura, CRO no. 638537, 2025. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
