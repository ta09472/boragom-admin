"use client";

import { Button, ColorPicker } from "antd";
import { useState } from "react";

export default function Palette() {
  // 해당 부분은 서버에서 데이터를 받아서 상태를 관리해야함
  const [color, setColor] = useState<number[]>([]);

  const handleClick = () => {
    setColor((prev) => {
      const tmp = prev.length + 1;
      return [...prev, tmp];
    });
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-4">
        <div>
          <Button onClick={handleClick}>Add</Button>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {color.map((v) => (
            <ColorPicker key={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
