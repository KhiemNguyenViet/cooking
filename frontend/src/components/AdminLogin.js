import React, { useState } from "react";
import "../styles/AdminLogin.css";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const admin = await res.json();
        onLogin(admin);
      } else {
        const msg = await res.text();
        setError(msg || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <h2>Đăng nhập Admin</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default AdminLogin;
