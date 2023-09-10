import ReservationForm from "@/components/Reservation/ReservationForm";
import { TReservation } from "@/types/model/order/type";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";

interface Props {
  params: { id: string };
}

export default async function OrderEdit({ params }: Props) {
  const orderDetail: TReservation = await fetch(
    `${process.env.BASE_URL}/api/order/${params.id}`,
    {
      cache: "no-cache",
    }
  ).then((v) => v.json());

  return (
    <div className="flex flex-col py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4">
      <div className="flex flex-row justify-between text-center items-center">
        <Button
          href={`/order/${params.id}`}
          type="link"
          className=" text-black w-0"
          icon={<LeftOutlined />}
        />
        <p className=" font-semibold">주문 내역 수정</p>
        <div></div>
      </div>
      <div
        className={twMerge(
          "overflow-auto h-[37rem] bg-white rounded-md p-4 flex flex-col gap-4"
        )}
      >
        <ReservationForm order={orderDetail} />

        {/* <div className="flex justify-between  text-gray-800">
          예약자 성함:<p>{name}</p>
        </div>
        <div className="flex justify-between  text-gray-800 font-semibold">
          픽업 날짜 및 시간:
          <p>{format(new Date(pickupDate), "yyyy-MM-dd hh-mm")}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          주문 상태 :<p>{OrderStatus[status].label}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          사이즈:<p>{size}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          시트:<p>{flavor}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          옵션:<p>{option}</p>
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
        </div> */}
      </div>
      {/* <Button type="primary" style={{ backgroundColor: "#7f40dd" }}>
        변경 사항 저장
      </Button> */}
    </div>
  );
}
