const jwt = require('jsonwebtoken');

// Middleware kiểm tra token JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token không được cung cấp!" });
  }

  try {
    // Giải mã token và lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Lưu thông tin người dùng vào req.user
    next();  // Tiếp tục xử lý route
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

module.exports = authMiddleware;
