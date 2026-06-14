import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Lấy thẻ từ (token) trong két sắt ra kiểm tra
  const token = localStorage.getItem('access_token');
  
  // Nếu có token -> cho phép đi tiếp (Hiển thị các trang con qua Outlet)
  // Nếu KHÔNG có -> Chuyển hướng (Navigate) ép về trang /login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;