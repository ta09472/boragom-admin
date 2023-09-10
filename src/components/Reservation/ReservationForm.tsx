"use client";

import { FlavorMap, OrderStatus, TReservation } from "@/types/model/order/type";
import { getDateByyyyyMMdd } from "@/util/time";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Radio,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";

interface Props {
  order: TReservation;
  form: FormInstance;
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

// const editionalOption = [
//   { label: "보냉백 + 아이스팩", value: "보냉백 + 아이스팩" },
//   { label: "아이스팩", value: "아이스팩" },
//   { label: "선택 안함", value: "선택 안함" },
// ];

export default function ReservationForm({ order, form }: Props) {
  const { id } = useParams();
  const router = useRouter();

  const endPoint = `${process.env.BASE_URL}/api/order/${id}`;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const deleteHandler = async () => {
    await fetch(endPoint, {
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
        form={form}
      >
        <Form.Item name="name" label="이름" initialValue={order.name}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="주문 상태" initialValue={order.status}>
          <Radio.Group optionType="button" options={statusOption} />
        </Form.Item>
        <Form.Item name="flavor" label="맛" initialValue={order.flavor}>
          <Select options={flavorOptions} />
        </Form.Item>
        <Form.Item name="size" label="사이즈" initialValue={order.size}>
          <Select options={sizeOptions} />
        </Form.Item>
        <Form.Item
          name="backgroundColor"
          label="배경색"
          initialValue={order.backgroundColor}
        >
          <Input />
        </Form.Item>
        <div className="flex-row flex gap-6">
          <Form.Item
            name="date"
            label="픽업 날짜"
            {...config}
            initialValue={dayjs(getDateByyyyyMMdd(order.pickupDate))}
          >
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item
            name="time"
            label="픽업 시간"
            {...config}
            initialValue={dayjs(getDateByyyyyMMdd(order.pickupDate))}
          >
            <DatePicker picker="time" format="HH:mm" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item name="content" label="내용" initialValue={order.content}>
          <TextArea rows={5} style={{ resize: "none" }} />
        </Form.Item>
        <Form.Item
          name="detailRequest"
          label="요청사항"
          initialValue={order.detailRequest}
        >
          <TextArea rows={5} style={{ resize: "none" }} />
        </Form.Item>
        {/* <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
        <Form.Item name="option" label="옵션" initialValue={order.option}>
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="연락처"
          initialValue={order.phoneNumber}
        >
          <Input />
        </Form.Item>
      </Form>
      <Button
        danger
        type="primary"
        onClick={deleteHandler}
        icon={<DeleteOutlined />}
      >
        주문 삭제
      </Button>
    </>
  );
}
