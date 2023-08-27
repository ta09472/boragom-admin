"use client";

import { Badge, Card, Select } from "antd";
import CardHeader from "./CardHeader";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import OrderInformation from "./OrderInformation";
import {
  OrderStatus,
  TOrderStatus,
  TReservation,
} from "@/types/model/order/type";

interface Props {
  reservationInfo: TReservation;
}

const statusList = Object.entries(OrderStatus).map((v) => {
  return { label: v[1].label, value: v[0] };
});

export default function Reservation({ reservationInfo }: Props) {
  const { status, pickupDate } = reservationInfo;
  const [reservationStatus, setReservationStatus] =
    useState<TOrderStatus>(status);

  const handleClick = (v: TOrderStatus) => {
    setReservationStatus(v);
  };

  return (
    <Badge.Ribbon
      text={
        <Select
          defaultValue={OrderStatus[reservationStatus].value}
          suffixIcon={false}
          bordered={false}
          onChange={handleClick}
          className=" text-white w-[6.5rem]"
          options={statusList}
        />
      }
      color={OrderStatus[reservationStatus].color}
      placement="start"
      className="hover:brightness-110 ease-in-out duration-300"
    >
      <Card
        title={<CardHeader pickupDate={new Date(pickupDate).toISOString()} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <OrderInformation reservationInfo={reservationInfo} />
      </Card>
    </Badge.Ribbon>
  );
}
