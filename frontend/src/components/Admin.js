import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import "../styles/Admin.css";

function Admin() {
  const [admin, setAdmin] = useState(() => {
    // Lưu thông tin admin vào localStorage để giữ đăng nhập
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  if (!admin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
      <h1>Admin Home Page</h1>
      <p>Chào mừng, {admin.name}!</p>
      {/* Thêm giao diện quản lý dữ liệu ở đây */}
    </div>
  );
}

export default Admin;
