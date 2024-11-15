require('dotenv').config(); // Tải các biến môi trường từ tệp .env

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ĐĂNG KÝ NGƯỜI DÙNG */
router.post("/register", async (req, res) => {
  try {
    // Tách các trường cần thiết từ dữ liệu yêu cầu
    const { firstName, lastName, email, password } = req.body;

    // Kiểm tra đầu vào (đảm bảo tất cả các trường đều được cung cấp)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tất cả các trường là bắt buộc!" });
    }

    // Kiểm tra xem người dùng đã tồn tại hay chưa bằng cách kiểm tra email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Người dùng đã tồn tại!" });
    }

    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const salt = await bcrypt.genSalt(10); // Tạo salt với yếu tố chi phí là 10
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo một đối tượng người dùng mới và lưu dữ liệu người dùng
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Lưu mật khẩu đã mã hóa
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    await newUser.save();

    // Trả về phản hồi thành công với đối tượng người dùng mới
    res.status(200).json({ message: "Đăng ký người dùng thành công!", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Đăng ký thất bại!", error: err.message });
  }
});

/* ĐĂNG NHẬP NGƯỜI DÙNG */
router.post("/login", async (req, res) => {
  try {
    // Tách email và mật khẩu từ dữ liệu yêu cầu
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: "Email và mật khẩu là bắt buộc!" });
    }

    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa lưu trong cơ sở dữ liệu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Thông tin đăng nhập không hợp lệ!" });
    }

    // Tạo một token JWT với ID người dùng và khóa bí mật
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Loại bỏ trường mật khẩu khỏi đối tượng người dùng trước khi trả về phản hồi
    user.password = undefined;

    // Trả về phản hồi thành công với token JWT và thông tin người dùng
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Đăng nhập thất bại!", error: err.message });
  }
});



module.exports = router;
