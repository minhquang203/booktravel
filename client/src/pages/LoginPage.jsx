import React, { useState } from "react";
import "../styles/Login.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loggedInData = await response.json();
        console.log("Đăng nhập thành công:", loggedInData);
        // Redirect or save token here if needed
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Đăng nhập thất bại.");
      }
    } catch (error) {
      console.error("lỗi trong quá trình đăng nhập :", error);
      setErrorMessage("có lỗi xảy ra trong quá trình đăng nhập .");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
        <a href="/register">Không có tài khoản? Đăng ký tại đây</a>
      </div>
    </div>
  );
};

export default LoginPage;
