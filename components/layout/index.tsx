/* eslint-disable @next/next/no-img-element */
import { Breadcrumb, Layout, Menu } from "antd";
import React from "react";
import "./style.scss";
import { useRouter } from "next/router";
import Image from "next/image";
const { Header, Content, Footer } = Layout;
interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutApp = (props: LayoutProps) => {
  let router = useRouter();
  const { children } = props;
  const MenuItems = [{ key: "/", label: "Home" }];

  const handleClickMenu = (menuItem: any) => {
    router.push(menuItem?.key);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img
            className="img-logo"
            alt=""
            src="/image/International_Pokémon_logo.svg.png"
          />
        </div>
        <Menu
          onClick={(menuItem: any) => handleClickMenu(menuItem)}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={MenuItems}
        />
      </Header>
      <Content className="site-layout content">{children}</Content>
      <Footer style={{ textAlign: "center" }}>MinhPT</Footer>
    </Layout>
  );
};

export default LayoutApp;
