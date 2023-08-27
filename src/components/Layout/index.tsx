"use client";

import { Layout, MenuProps, Menu } from "antd";
import { useState } from "react";

import { MenuInfo } from "rc-menu/lib/interface";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "/"),
  getItem("Management", "management"),
];

export function Sider() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const getSelectedKeys = (pathname: string) => {
    switch (pathname) {
      case "/management":
        return ["management"];
      default:
        return ["/"];
    }
  };

  const handleClick = ({ key }: MenuInfo) => {
    router.push(key);
  };

  return (
    <Layout.Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="h-screen"
    >
      <div className=" justify-center items-center flex-col">
        <Image src="/boragom.png" alt="logo" width="200" height="200" />

        {/* <Image alt="logo" src="/logo.png" preview={false} /> */}
        <Menu
          defaultSelectedKeys={getSelectedKeys(pathname)}
          mode="inline"
          items={items}
          onClick={handleClick}
        />
      </div>
    </Layout.Sider>
  );
}

export function Header() {
  const getSelectedKeys = (pathname: string) => {
    switch (pathname) {
      case "/management":
        return ["management"];
      default:
        return ["/"];
    }
  };

  const handleClick = ({ key }: MenuInfo) => {};

  return (
    <Layout.Header className="bg-white border-b-2 border-violet-200 h-[3.5rem] flex  items-center content-center">
      Boragom
    </Layout.Header>
  );
}

export function Footer() {
  return <Layout.Footer>Boragom</Layout.Footer>;
}
