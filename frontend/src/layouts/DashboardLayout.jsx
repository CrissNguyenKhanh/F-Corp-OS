import React from 'react';
import { Layout, Menu, Button, Typography } from 'antd';
import { UserOutlined, ProjectOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại để bôi đậm menu
  
  // Lấy thông tin user để hiển thị tên lên Header
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Xóa thẻ
    localStorage.removeItem('user_info');    // Xóa hồ sơ
    navigate('/login');                      // Đuổi ra cửa
  };

  // Cấu hình các nút trong Menu
  const menuItems = [
    { key: '/dashboard/users', icon: <TeamOutlined />, label: 'Nhân Sự' },
    { key: '/dashboard/projects', icon: <ProjectOutlined />, label: 'Dự Án' },
    { key: '/dashboard/allocations', icon: <UserOutlined />, label: 'Điều Phối' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* THANH MENU BÊN TRÁI */}
      <Sider theme="dark" width={250}>
        <div style={{ height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>F-Corp OS</Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]} // Tự động bôi đậm menu đang chọn
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      {/* KHU VỰC BÊN PHẢI */}
      <Layout>
        {/* THANH HEADER BÊN TRÊN */}
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <span style={{ marginRight: 20 }}>Xin chào, <b>{userInfo.fullName || 'Admin'}</b> ({userInfo.role})</span>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>

        {/* KHU VỰC NỘI DUNG CHÍNH (Nơi ruột thay đổi) */}
        <Content style={{ margin: '24px', padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet /> {/* Nơi các trang con (Users, Projects...) được nhét vào */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;