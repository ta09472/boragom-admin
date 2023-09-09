import { TOrderStatus, TReservation } from "@/types/model/order/type";
import { addTextRestedTime, calculateTimeRemaining } from "@/util/time";
import { Avatar, List } from "antd";
import {
  addWeeks,
  endOfWeek,
  format,
  isThisWeek,
  isToday,
  isTomorrow,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { twMerge } from "tailwind-merge";

import NoReservation from "../NoReservation";

import { Segment, Option } from "@/app/page";
import Link from "next/link";

const getFilteredData = (data: TReservation[] | undefined, seg: Segment) => {
  switch (seg) {
    case "DAY":
      return data?.filter(({ pickupDate }) => isToday(new Date(pickupDate)));

    case "WEEK":
      return data?.filter(({ pickupDate }) => isThisWeek(new Date(pickupDate)));

    case "TOMORROW":
      return data?.filter(({ pickupDate }) => isTomorrow(new Date(pickupDate)));

    case "NEXT_WEEK":
      return data?.filter(({ pickupDate }) => {
        const today = new Date();
        return isWithinInterval(new Date(pickupDate), {
          start: startOfWeek(addWeeks(today, 1)),
          end: endOfWeek(addWeeks(today, 1)),
        });
      });

    default:
      return [];
  }
};

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

interface Props {
  segment: Option;
}

export default async function ReservationList({ segment }: Props) {
  const data: TReservation[] = await fetch(
    `${process.env.BASE_URL}/api/order`,
    {
      next: {
        revalidate: 10,
      },
    }
  ).then((v) => v.json());

  const filteredData = getFilteredData(data, segment.value);
  const isEmpty = filteredData?.length === 0 ? true : false;

  if (isEmpty) <NoReservation />;

  return (
    <List
      itemLayout="horizontal"
      dataSource={filteredData}
      renderItem={(item, index) => (
        <Link href={`${process.env.BASE_URL}/detail/${item.id}`}>
          <List.Item
            className={twMerge(
              "p-2 bg-white border-l-8  rounded-md my-3",
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
        </Link>
      )}
    />
  );
}
