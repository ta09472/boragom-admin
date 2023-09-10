"use client";

import { FlavorMap, OrderStatus, TReservation } from "@/types/model/order/type";
import { getDateByyyyyMMdd, getTimeByhhmm } from "@/util/time";
import { Button, DatePicker, Form, Input, Radio, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format, parse } from "date-fns";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";

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
  const [form] = Form.useForm();

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

    // id: number;
    // name: string;
    // phoneNumber: string;
    // pickupDate: Date;
    // size: string;
    // flavor: string;
    // backgroundColor: string;
    // content: string;
    // option: string;
    // detailRequest: string;
    // status: $Enums.OrderStatus;

    const req: Omit<TReservation, "id"> = {
      name: input.name,
      phoneNumber: input.phoneNumber,
      pickupDate: result,
      size: input.size,
      flavor: input.flavor,
      backgroundColor: input.backgroundColor,
      content: input.content,
      option: input.option,
      detailRequest: input.detailRequest,
      status: order.status,
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
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 800 }}
        form={form}
        onFinish={submitForm}
      >
        <Form.Item name="name" label="이름" initialValue={order.name}>
          <Input />
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
        <Form.Item name="option" label="옵션" initialValue={order.option}>
          <Input />
        </Form.Item>
        <div className="flex-row flex">
          <Form.Item
            name="date"
            label="픽업 날짜"
            {...config}
            initialValue={dayjs(getDateByyyyyMMdd(order.pickupDate))}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="time"
            label="픽업 시간"
            {...config}
            initialValue={dayjs(getDateByyyyyMMdd(order.pickupDate))}
          >
            <DatePicker picker="time" format="HH:mm" />
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
        {/* // 얘만 밖으로 빼고 싶은데 */}
        <Form.Item
          name="phoneNumber"
          label="연락처"
          initialValue={order.phoneNumber}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block onClick={submitForm}>
            변경 사항 저장
          </Button>
        </Form.Item>
      </Form>
      <Button danger type="primary" onClick={deleteHandler}>
        주문 삭제
      </Button>
    </>
  );
}
