"use client";

import { FlavorMap, OrderStatus, TReservation } from "@/types/model/order/type";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  order: TReservation;
}

const config = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please select time!",
    },
  ],
};

const flavorOptions = Object.entries(FlavorMap).map((v) => ({
  label: v[1],
  value: v[0],
}));

const sizeOptions = [
  { label: "미니", value: "mini" },
  { label: "1호", value: "1" },
  { label: "2호", value: "2" },
  { label: "3호", value: "3" },
];

const statusOption = Object.entries(OrderStatus).map((v) => ({
  label: v[1].label,
  value: v[1].value,
}));

export default function ReservationForm({ order }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({});
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const deleteHandler = async () => {
    await fetch(`${process.env.BASE_URL}/api/order/${id}`, {
      method: "DELETE",
    }).then((v) => v.json());

    await router.push("/");
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
      >
        <Form.Item label="이름">
          <Input value={order.name} />
        </Form.Item>
        <Form.Item label="연락처">
          <Input value={order.phoneNumber} />
        </Form.Item>
        <Form.Item label="사이즈">
          <Select options={sizeOptions} value={order.size} />
        </Form.Item>
        <Form.Item label="맛">
          <Select options={flavorOptions} value={order.flavor} />
        </Form.Item>
        <div className="flex-row flex">
          <Form.Item name="date-time-picker" label="픽업 날짜" {...config}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="date-time-picker" label="픽업 시간" {...config}>
            <DatePicker format="HH:mm" picker="time" />
          </Form.Item>
        </div>

        <Form.Item label="내용">
          <TextArea rows={5} value={order.content} style={{ resize: "none" }} />
        </Form.Item>
        <Form.Item label="요청사항">
          <TextArea
            rows={5}
            value={order.detailRequest}
            style={{ resize: "none" }}
          />
        </Form.Item>

        <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
      <Button danger type="primary" onClick={deleteHandler}>
        주문 삭제
      </Button>
    </>
  );
}
