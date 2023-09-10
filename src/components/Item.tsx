import { Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface Props {
  name: string;
  count: number;
}

export default function Item({ name, count }: Props) {
  const isLowItems = (v: number) => {
    if (v <= 20) return true;
    return false;
  };

  return (
    <Card>
      <div className="flex flex-row justify-between align-middle">
        <div className=" items-center align-middle flex flex-row">
          {isLowItems(count) ? (
            <ExclamationCircleOutlined
              className="pr-2"
              style={{ color: "#f5f247", fontSize: "1.4rem" }}
            />
          ) : null}
          <div>{name}</div>
        </div>
        <p>{count}개</p>
      </div>
    </Card>
  );
}
