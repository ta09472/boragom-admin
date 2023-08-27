"use client";

import { TReservation } from "@/_types/model/order/type";
import { Collapse, Descriptions, DescriptionsProps } from "antd";

import { format } from "date-fns";

interface Props {
  reservationInfo: TReservation;
}

export default function OrderInformation({ reservationInfo }: Props) {
  const {
    pickupDate,
    phoneNumber,
    size,
    flavor,
    backgroundColor,
    option,
    content,
    name,
    detailRequest,
    image,
  } = reservationInfo;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "주문자",
      children: name,
    },
    {
      key: "2",
      label: "픽업날짜",
      children: format(new Date(pickupDate), "yyyy-MM-dd hh-mm"),
    },
    {
      key: "3",
      label: "연락처",
      children: phoneNumber,
    },

    {
      key: "4",
      label: "사이즈",
      children: size,
    },
    {
      key: "5",
      label: "시트",
      children: flavor,
    },
    {
      key: "6",
      label: "옵션",
      children: <>{option?.join(", ")}</>,
    },
    {
      key: "7",
      label: "케이크 바탕색",
      children: backgroundColor,
      span: 3,
    },
    {
      key: "8",
      label: "케이크 문구 및 문구색 / 하판 문구 및 문구 색",
      children: content,
      span: 3,
    },
  ];

  const nestedItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "구체적인 요청사항",
      children: detailRequest,
    },
    {
      key: "2",
      label: "참고 사진",
      children: image,
    },
  ];

  return (
    <>
      <Descriptions title="주문 정보" items={items} />
      <Collapse
        ghost
        items={[
          {
            key: "1",
            label: "Detail",
            children: (
              <Collapse
                ghost
                items={
                  nestedItems
                  // {
                  //     key: '3',
                  //     label: <p>팔레트</p>,
                  //     children: <Palette />,
                  // },
                }
              />
            ),
          },
        ]}
      />
    </>
  );
}
