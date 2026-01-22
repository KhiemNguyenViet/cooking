import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Mặc định: chưa đăng nhập
  const [user, setUser] = useState(null);

  // Đăng nhập mẫu (thực tế sẽ gọi API)
  const login = (userData) => setUser(userData);
  // Đăng xuất
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
