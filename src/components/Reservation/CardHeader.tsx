"use client";

import { addTextRestedTime } from "@/util/time";

interface Props {
  pickupDate: string;
}

export default function CardHeader({ pickupDate }: Props) {
  const restedTime = addTextRestedTime(pickupDate);

  return (
    <div className=" flex flex-row justify-end">
      <div>{restedTime}</div>
    </div>
  );
}
