import { TReservation } from "@/types/model/order/type";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { format } from "date-fns";

interface Props {
  params: { id: string };
}

export default async function OrderDetail({ params }: Props) {
  const orderDetail: TReservation = await fetch(
    `http://localhost:3000/api/order/${params.id}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 10,
      },
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
      <div className="flex flex-row  text-center items-center">
        <Button
          href="/"
          type="link"
          className=" text-black"
          icon={<LeftOutlined />}
        />
        <p>상세 내역</p>
        <></>
      </div>
      <div className="overflow-auto h-[40rem] bg-white rounded-md p-4 flex flex-col gap-4">
        <div className="flex justify-between  text-gray-800">
          예약자 성함:<p>{name}</p>
        </div>

        <div className="flex justify-between  text-gray-800">
          픽업 날짜 및 시간:
          <p>{format(new Date(pickupDate), "yyyy-MM-dd hh-mm")}</p>
        </div>

        <div className="flex justify-between  text-gray-800">
          사이즈:<p>{size}</p>
        </div>
        <div className="flex justify-between  text-gray-800">
          시트:<p>{flavor}</p>
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
