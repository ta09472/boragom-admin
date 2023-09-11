"use client";

import { Layout, MenuProps, Menu, FloatButton } from "antd";
import { useState } from "react";

import { MenuInfo } from "rc-menu/lib/interface";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import NavBar from "../NavBar";
import Link from "next/link";
import { TReservation } from "@/types/model/order/type";
import AddReservation from "../Reservation/AddReservation";

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
  return (
    <Layout.Header className=" bg-white border-b-2 border-violet-100 h-[3.5rem] flex flex-row p-2  items-center sticky top-0 z-50">
      <Link href="/">
        <Image src="/boragom.png" alt="logo" width="50" height="50" />
      </Link>
    </Layout.Header>
  );
}

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const addReservation = async (v: TReservation) => {
    try {
      await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(v),
        cache: "no-store",
      });
    } catch (error) {
      console.log(error);
    }
    router.refresh();
  };

  return (
    <Layout.Footer className="p-0 fixed bottom-0 w-screen h-[4rem]">
      <AddReservation onClick={addReservation} />
      {/* <NavBar /> */}
    </Layout.Footer>
  );
}
