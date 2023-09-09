"use client";

import { HddFilled, HomeOutlined } from "@ant-design/icons";
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
        cache: "no-cache",
      });
    } catch (error) {
      console.log(error);
    }
    router.refresh();
  };

  return (
    <div className="w-screen px-2 flex justify-between align-middle items-center h-full">
      <Link href={"/"}>
        <HomeOutlined
          style={{
            fontSize: "2rem",
            color: getSelectedKeys(pathname) === "/" ? "#d9c7f5" : "#07020d",
          }}
        />
      </Link>
      <AddReservation onClick={addReservation} />
      <Link href={"/management"}>
        <HddFilled
          style={{
            fontSize: "2rem",
            color:
              getSelectedKeys(pathname) === "management"
                ? "#d9c7f5"
                : "#07020d",
          }}
        />
      </Link>
    </div>
  );
}
