import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      data: null,
    });
  }
};

export { authMiddleware };
