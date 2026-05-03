import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./LoginPage.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { loginUser, checkAuth } from "../services/auth-api";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

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
      setEmailError("Email is required");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const { status, data } = await loginUser(email, password);

      if (data.success) {
        navigate("/pricelist");
      } else if (status === 500) {
        setServerError(
          "Something went wrong with our server, please try again later",
        );
      } else {
        setServerError("Invalid email or password, please try again");
      }
    } catch (err) {
      setServerError(
        "Something went wrong with our server, please try again later",
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main">
        <div className="login-card">
          <h1 className="login-title">Log in</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter your email address</label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="form-group">
              <label>Enter your password</label>
              <div className="password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              Log in
            </button>
          </form>

          <div className="card-links">
            <a href="#register">Register</a>
            <a href="#forgot-password">Forgotten password?</a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-top">
          <span>123 Fakturera</span>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#order">Order</a>
            <a href="#contact-us">Contact us</a>
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
