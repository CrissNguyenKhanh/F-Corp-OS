import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Đường dẫn mặc định sẽ chuyển hướng về trang login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Đường dẫn trang đăng nhập */}
        <Route path="/login" element={<Login />} />
        
        {/* Trang Dashboard tạm thời để trống */}
        <Route path="/dashboard" element={<h1>Chào mừng đến với F-Corp OS Dashboard!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;