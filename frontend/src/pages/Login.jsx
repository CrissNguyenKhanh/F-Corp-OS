import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false); // Hiệu ứng loading nút bấm
  const navigate = useNavigate(); // Công cụ chuyển trang

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 1. Mang Email & Password bắn xuống Backend
      const response = await axios.post('http://localhost:3000/auth/login', values);
      
      // 2. Nếu thành công, bóc tách dữ liệu Token và User
      const { access_token, user } = response.data;
      
      // 3. Cất Token vào "Két sắt" của trình duyệt (localStorage)
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user_info', JSON.stringify(user));
      
      message.success(`Chào mừng ${user.fullName} trở lại!`);
      
      // 4. Chuyển hướng sang trang Dashboard
      navigate('/dashboard');
    } catch (error) {
      // Bắt lỗi nếu sai pass hoặc email
      message.error(error.response?.data?.message || 'Lỗi kết nối đến Server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#1890ff', margin: 0 }}>F-Corp OS</Title>
          <p style={{ color: '#8c8c8c' }}>Hệ thống Điều phối Nhân sự Doanh nghiệp</p>
        </div>

        <Form name="login_form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email (VD: pm.duong@fpt.com)" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;