import OrderStatusSelect from "@/components/OrderStatusSelect";
import {
  OrderStatus,
  TOrderStatus,
  TReservation,
} from "@/types/model/order/type";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

const getColor = (v: TOrderStatus) => {
  switch (v) {
    case "PAYMENT_COMPLETED":
      return "border-blue-500";
    case "PICKUP_COMPLETED":
      return "border-green-500";
    case "PRODUCTION_COMPLETED":
      return "border-violet-500";
    case "REFUND_COMPLETED":
      return "border-gray-500";
    default:
      return "border-gray-50";
  }
};

interface Props {
  params: { id: string };
}

export default async function OrderDetail({ params }: Props) {
  console.log(params.id);
  const orderDetail: TReservation = await fetch(
    `${process.env.BASE_URL}/api/order/${params.id}`,
    {
      cache: "no-store",
    }
  ).then((v) => v.json());

  const {
    name,
    detailRequest,
    phoneNumber,
    option,
    pickupDate,
    size,
    status,
    flavor,
    backgroundColor,
    content,
    image,
  } = orderDetail;

  return (
    <div className="flex flex-col py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4">
      <div className="flex flex-row justify-between text-center items-center">
        <Button
          href="/"
          type="link"
          className=" text-black w-0"
          icon={<LeftOutlined />}
        />
        <p className="font-semibold">상세 내역</p>
        <Button
          type="link"
          icon={<EditOutlined />}
          className=" text-black"
          href={`/edit/${params.id}`}
        />
      </div>
      <div
        className={twMerge(
          "overflow-auto bg-white rounded-md p-4 flex flex-col gap-4"
          // getColor(status)
        )}
        style={{ height: "82.5dvh" }}
      >
        <div className="flex justify-between  text-gray-800">
          예약자 성함:<p>{name}</p>
        </div>
        <div className="flex justify-between  text-gray-800 font-semibold">
          픽업 날짜 및 시간:
          <p>{format(new Date(pickupDate), "yyyy-MM-dd HH:mm")}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          주문 상태 : <OrderStatusSelect status={OrderStatus[status].value} />
        </div>
        <div className="flex justify-between  text-gray-800">
          사이즈:<p>{size}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          맛:<p>{flavor}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          옵션:<p>{option}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          바탕색:<p>{backgroundColor}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          내용:
          <br />
          {content}
        </div>
        <div className="flex justify-between  text-gray-800">
          요구사항:
          <br />
          {detailRequest}
        </div>
        <div className="flex justify-between  text-gray-800">
          연락처:<p>{phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}
