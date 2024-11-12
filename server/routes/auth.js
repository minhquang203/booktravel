const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Đăng ký người dùng - POST /auth/register
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Tất cả các trường đều bắt buộc." });
  }

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Lưu vào MongoDB
    return res.status(201).json({ message: "Đăng ký người dùng thành công." });
  } catch (error) {
    console.error("Lỗi khi đăng ký người dùng:", error);
    return res.status(500).json({ message: "Lỗi máy chủ khi đăng ký.", error });
  }
});

// Đăng nhập người dùng - POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại trong hệ thống không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại." });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Thông tin đăng nhập không chính xác!" });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Loại bỏ trường mật khẩu khỏi phản hồi
    user.password = undefined; // Set password to undefined instead of destructuring

    res.status(200).json({ token, user });
  } catch (error) {
    console.log("Lỗi khi đăng nhập:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
