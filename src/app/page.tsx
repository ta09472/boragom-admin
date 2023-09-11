"use client";

import { Segmented } from "antd";
import { Option } from "antd/es/mentions";
import { SegmentedValue } from "antd/es/segmented";
import { Suspense, useState } from "react";
import ReservationList from "@/components/Reservation/ReservationList";
import Loading from "./loading";
import { Footer } from "@/components/Layout";

export type Segment = "DAY" | "WEEK" | "NEXT_WEEK" | "TOMORROW";
export type Option = { label: string; value: Segment };

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

export default function Home() {
  const [segment, setSegment] = useState<Option>(defaultOption);

  const handleClick = (v: SegmentedValue) => {
    const value = baseOptions.find((opt) => opt.value === v)!;

    setSegment(value);
  };

  return (
    <div className="flex flex-col py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4">
      <div className="flex flex-col place-self-end">
        <Segmented
          options={options}
          defaultValue={defaultOption.value}
          value={segment.value}
          onChange={handleClick}
        />
      </div>
      <div className="overflow-auto" style={{ height: "82.5dvh" }}>
        <Suspense fallback={<Loading />}>
          <ReservationList segment={segment} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
