import { TOrderStatus, TReservation } from "@/_types/model/order/type";
import { addTextRestedTime, calculateTimeRemaining } from "@/util/time";
import { Avatar, List } from "antd";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

interface Props {
  reservationInfo: TReservation[] | undefined;
}

export default function ReservationList({ reservationInfo }: Props) {
  const getColor = (v: TOrderStatus) => {
    switch (v) {
      case "PAYMENT_COMPLETED":
        return "border-blue-500";
      case "PICKUP_COMPLETED":
        return "border-green-500";
      case "PRODUCTION_COMPLETED":
        return "border-violet-500";
      case "REFUND_COMPLETED":
        return "border-gray-500";
      default:
        return "border-gray-50";
    }
  };

  twMerge;
  return (
    <List
      itemLayout="horizontal"
      dataSource={reservationInfo}
      renderItem={(item, index) => (
        <List.Item
          className={twMerge(
            "p-2 bg-white border-l-8  rounded-md",
            getColor(item.status)
          )}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            key={item.id}
            title={<div>{item.name}</div>}
            description={
              <div className="flex-col flex">
                <div className=" font-semibold text-black">
                  {addTextRestedTime(new Date(item.pickupDate).toISOString())}
                </div>
                <div>사이즈: {item.size}호</div>
                <div>
                  픽업 날짜:
                  {format(new Date(item.pickupDate), "yyyy-MM-dd hh-mm")}
                </div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
