import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex flex-row py-4 px-4 md:px-24 lg:px-48 xl:px-96 gap-4 justify-center h-auto">
      <Spin />
    </div>
  );
}
