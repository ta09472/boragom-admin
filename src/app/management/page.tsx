import { Card } from "antd";
import { Suspense } from "react";
import Loading from "./loading";
import Item from "@/components/Item";

export default async function Management() {
  return (
    <div>
      <div className="flex flex-col py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4">
        <div className="overflow-auto h-[40rem] flex flex-col gap-2">
          <Suspense fallback={<Loading />}>
            <Item name="초" count={25} />
            <Item name="1호 하판" count={10} />
            <Item name="2호 하판" count={20} />
            <Item name="3호 하판" count={30} />
            <Item name="1호 상자" count={12} />
            <Item name="2호 상자" count={20} />
            <Item name="3호 상자" count={50} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
