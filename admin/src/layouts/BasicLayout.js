import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './BasicLayout.css'
import AddArticle from '../pages/AddArticle'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          x1nGoo、
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            工作台
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileOutlined />} title="文章管理">
            <Menu.Item key="3">文章列表</Menu.Item>
            <Menu.Item key="4">添加文章</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>x1nGoo ©2020 Created by lyx</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderDemo