"use client";

import { OrderStatus, TOrderStatus } from "@/types/model/order/type";
import { Select } from "antd";
import { useParams, useRouter } from "next/navigation";

const statusOption = Object.entries(OrderStatus).map((v) => ({
  label: v[1].label,
  value: v[1].value,
}));

interface Props {
  status: TOrderStatus;
}

export default function OrderStatusSelect({ status }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const updateStatus = async (status: TOrderStatus) => {
    const data = await fetch(`${process.env.BASE_URL}/api/order/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      next: { revalidate: 10 },
    });

    // 수정이 필요해 보임 상태 변경 후에
    router.refresh();
    router.push("/");
  };

  return (
    <Select
      options={statusOption}
      defaultValue={status}
      bordered={false}
      onSelect={(v) => updateStatus(v as TOrderStatus)}
    />
  );
}
