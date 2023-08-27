import { HddFilled, HomeOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import "./style.css";
import Link from "next/link";
import AddReservation from "../Reservation/AddReservation";
import { TReservation } from "@/types/model/order/type";

export default function NavBar() {
  const pathname = usePathname();

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
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(v),
      });
    } catch (error) {
      console.log(error);
    }
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
