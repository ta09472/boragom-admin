"use client";

import { Empty, Segmented } from "antd";
import { Option } from "antd/es/mentions";
import { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
  addWeeks,
  endOfWeek,
  isThisWeek,
  isToday,
  isTomorrow,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { TReservation } from "../types/model/order/type";
import getReservation from "../types/model/order/mock";
import Reservation from "@/components/Reservation/Reservation";
import AddReservation from "@/components/Reservation/AddReservation";
import ReservationList from "@/components/Reservation/ReservationList";
import NoReservation from "@/components/NoReservation";

type Segment = "DAY" | "WEEK" | "NEXT_WEEK" | "TOMORROW";
type Option = { label: string; value: Segment };

const baseOptions: Option[] = [
  { label: "오늘", value: "DAY" },
  { label: "내일", value: "TOMORROW" },
  { label: "이번주", value: "WEEK" },
  { label: "다음주", value: "NEXT_WEEK" },
];

const options = baseOptions.map(({ label, value }) => {
  return {
    value,
    label,
  };
});
const defaultOption = baseOptions[0];

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

export default function Home() {
  const [segment, setSegment] = useState<Option>(defaultOption);
  const [viewType, setViewType] = useState<"List" | "Kanban">("List");

  const data = getReservation();

  const [mock, setMock] = useState<TReservation[] | undefined>(data);

  const filteredData = getFilteredData(mock, segment.value);

  const handleClick = (v: SegmentedValue) => {
    const value = baseOptions.find((opt) => opt.value === v)!;

    setSegment(value);
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

  const isEmpty = filteredData?.length === 0 ? true : false;

  const renderView = (
    viewType: "List" | "Kanban",
    data: TReservation[] | undefined
  ) => {
    switch (viewType) {
      case "Kanban":
        return filteredData?.map((v) => (
          <Reservation reservationInfo={v} key={v.id} />
        ));
        break;
      case "List":
        return <ReservationList reservationInfo={filteredData} />;

        break;
      default:
        return <div>Error</div>;
        break;
    }
  };
  return (
    <div className="flex flex-col py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4 bg">
      <div className="flex flex-col place-self-end">
        <Segmented
          options={options}
          defaultValue={defaultOption.value}
          value={segment.value}
          onChange={handleClick}
        />
        {/* <Segmented
          className=" place-self-end"
          defaultValue={"List"}
          onChange={(v) => setViewType(() => v as "List" | "Kanban")}
          options={[
            {
              value: "List",
              icon: <BarsOutlined />,
            },
            {
              value: "Kanban",
              icon: <AppstoreOutlined />,
            },
          ]}
        /> */}
      </div>
      <div className="overflow-auto h-full">
        {isEmpty ? <NoReservation /> : renderView(viewType, filteredData)}
      </div>
      {/* <AddReservation onClick={addReservation} /> */}
    </div>
  );
}
