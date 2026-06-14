import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* 🛡️ KHU VỰC BỊ KHÓA (Phải có Token mới được vào) */}
        <Route element={<PrivateRoute />}>
          {/* 🏢 Mặc định sẽ bọc cái Khung Dashboard ở ngoài */}
          <Route element={<DashboardLayout />}>
            
            {/* Khi gõ /dashboard, tự động đẩy sang màn Nhân sự */}
            <Route path="/dashboard" element={<Navigate to="/dashboard/users" replace />} />
            
            {/* Các trang con bên trong (đang để dạng Placeholder) */}
            <Route path="/dashboard/users" element={<h2>🚧 Màn hình Quản lý Nhân sự đang xây dựng...</h2>} />
            <Route path="/dashboard/projects" element={<h2>🚧 Màn hình Quản lý Dự án đang xây dựng...</h2>} />
            <Route path="/dashboard/allocations" element={<h2>🚧 Màn hình Điều phối đang xây dựng...</h2>} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;