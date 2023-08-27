import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { parseReservationInfo } from "../../util/index";
import { TReservation } from "@/_types/model/order/type";

const placeholder = `
1.예약자성함: 홍길동
2.연락처: 01010101010ㄴ
3.픽업 날짜/요일/시간: 2023-08-23
4.사이즈: 미니
5.시트: 화이트
6.케이크바탕색: 연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)
7.문구 / 문구색 : 하얀색
  -케이크 위:
The Luck
I Found (704)
  -하판: HAPPY DUJUN DAY
8.보냉백+아이스팩/아이스팩/안함(택1): 안 함
9.구체적인 요청사항: 레터링과 바탕 그라데이션이 중요해서 그 부분 가장 신경써서 부탁드립니다! 컬러는 ⭐️연한 파스텔톤⭐️으로 부탁드립니다. 바탕 화이트 부분 그라데이션으로 해주시되, 핑크색 하트 들어가는 부분에는 연핑크 그라데이션 넣어주셔도 될 것 같습니다!
10. 참고 사진:`;

const { TextArea } = Input;

interface Props {
  onClick: (v: TReservation) => void;
}

export default function AddReservation({ onClick }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState<string>("");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const onSubmit = () => {
    const result = parseReservationInfo(input);
    if (result) {
      onClick(result);
      setInput(() => "");

      handleClose();
    }
    console.log(result);
  };

  const handleOk = () => {
    const result = parseReservationInfo(input);
    if (result) {
      onClick(result);
      setInput(() => "");

      handleClose();
    }
    console.log(result);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setInput(() => newValue);
  };

  return (
    <>
      <Button
        className=" flex flex-row bg-white align-middle justify-center items-center h-10"
        block
        onClick={handleClick}
        type="text"
        icon={
          <PlusOutlined
            style={{
              color: "gray",
            }}
          />
        }
      />
      <Modal
        okType="default"
        title="예약 정보 입력"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleClose}
      >
        <TextArea
          value={input}
          style={{ height: 120, resize: "none" }}
          onChange={onChange}
          placeholder={placeholder}
          onPressEnter={onSubmit}
        />
      </Modal>
    </>
  );
}
