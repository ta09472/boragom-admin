import Reservation from "@/components/Reservation/Reservation";
import { TReservation } from "@/types/model/order/type";

export default async function Management() {
  const data: TReservation[] = await (
    await fetch("http://localhost:3000/api/order")
  ).json();

  return data?.map((v) => <Reservation reservationInfo={v} key={v.id} />);
}
