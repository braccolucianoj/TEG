import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Layout, Button, Menu } from 'antd';
import { withTranslation } from 'next-i18next';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, PlayCircleFilled } from '@ant-design/icons';

import homeText from '../services/i18n/home';
import { withLanguageChange } from '../components/HOC';
import GameForm from '../components/organisms/GameForm';

const { Header, Sider, Content } = Layout;

const HomePage = ({ t }: any): JSX.Element => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  const onRedirect = (pathname: string) => () => {
    router.push({ pathname });
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item icon={<UserOutlined />}>{t(homeText.profile)}</Menu.Item>
          <Menu.Item icon={<PlayCircleFilled />}>{t(homeText.games)}</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            className="trigger"
            onClick={toggle}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Button onClick={onRedirect('/game')}>{t(homeText.game)}</Button>
          <Button onClick={onRedirect('/games')}>{t(homeText.games)}</Button>
          <GameForm />
        </Content>
      </Layout>
    </Layout>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['home'],
});

export default withLanguageChange(withTranslation(['home'])(HomePage));
