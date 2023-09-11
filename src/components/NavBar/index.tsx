"use client";

import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import "./style.css";
import Link from "next/link";
import AddReservation from "../Reservation/AddReservation";
import { TReservation } from "@/types/model/order/type";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const getSelectedKeys = (pathname: string) => {
    switch (pathname) {
      case "/management":
        return "management";
      case "/":
        return "/";

      case "/settings":
        return "settings";
      default:
        return "/";
    }
  };

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
    <div className="w-screen px-5 flex justify-between align-middle items-center h-full rounded-t-xl bg-white">
      <Link href={"/"}>
        <HomeOutlined
          style={{
            fontSize: "1.6rem",
            color: getSelectedKeys(pathname) === "/" ? "#c3a7f0" : "#b8b8b8",
          }}
        />
      </Link>
      <AddReservation onClick={addReservation} />
      <Link href={"/management"}>
        <UnorderedListOutlined
          style={{
            fontSize: "1.4rem",
            color:
              getSelectedKeys(pathname) === "management"
                ? "#c3a7f0"
                : "#b8b8b8",
          }}
        />
      </Link>
    </div>
  );
}
