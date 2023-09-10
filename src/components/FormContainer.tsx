"use client";

import { twMerge } from "tailwind-merge";
import ReservationForm from "./Reservation/ReservationForm";
import { Button, Form } from "antd";
import { FlavorMap, TFlavor, TReservation } from "@/types/model/order/type";
import { getDateByyyyyMMdd, getTimeByhhmm } from "@/util/time";
import { format, parse } from "date-fns";
import { useParams, useRouter } from "next/navigation";

interface Props {
  order: TReservation;
}

export default function FormContainer({ order }: Props) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const router = useRouter();

  const endPoint = `${process.env.BASE_URL}/api/order/${id}`;

  const submitForm = async () => {
    const input = form.getFieldsValue();
    const pickupDate = getDateByyyyyMMdd(form.getFieldValue("date")["$d"]);
    const pickupTime = getTimeByhhmm(form.getFieldValue("time"));

    const date = parse(pickupDate, "yyyy-MM-dd", new Date());
    const time = parse(pickupTime, "HH:mm", new Date());

    // Date 객체의 날짜 부분과 시간 부분을 결합
    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    // 원하는 형식의 문자열로 변환
    const result = new Date(
      format(combinedDate, "yyyy-MM-dd HH:mm")
    ).toISOString();

    const req: Omit<TReservation, "id"> = {
      name: input.name,
      phoneNumber: input.phoneNumber,
      pickupDate: result,
      size: `${input.size}호`,
      flavor: FlavorMap[input.flavor as TFlavor],
      backgroundColor: input.backgroundColor,
      content: input.content,
      option: input.option,
      detailRequest: input.detailRequest,
      status: input.status,
    };

    const res = await fetch(endPoint, {
      method: "PUT",
      body: JSON.stringify(req),
    });
    const json = await res.json();

    await router.refresh();
    await router.push(`/order/${id}`);
  };
  return (
    <>
      <div
        className={twMerge("overflow-auto bg-white rounded-md flex flex-col")}
      >
        <ReservationForm order={order} form={form} />
      </div>
      <Button
        onClick={submitForm}
        type="primary"
        style={{ backgroundColor: "#7f40dd" }}
      >
        변경 사항 저장
      </Button>
    </>
  );
}
