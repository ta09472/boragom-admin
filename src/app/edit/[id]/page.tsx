import FormContainer from "@/components/FormContainer";
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
      cache: "no-store",
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
          "overflow-auto h-[40rem] bg-white rounded-md p-4 flex flex-col gap-4"
        )}
      >
        <FormContainer order={orderDetail} />
      </div>
    </div>
  );
}
