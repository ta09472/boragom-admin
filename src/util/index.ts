// 1.예약자성함: 김범수
// 2.연락처: 01010101010ㄴ
// 3.픽업 날짜/요일/시간: 7월 2일 토요일 오후 5시
// 4.사이즈: 미니
// 5.시트: 화이트
// 6.케이크바탕색: 연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)
// 7.문구 / 문구색 : 하얀색
//   -케이크 위:
// The Luck
// I Found (704)
//   -하판: HAPPY DUJUN DAY
// 8.보냉백+아이스팩/아이스팩/안함(택1): 안 함
// 9.구체적인 요청사항: 레터링과 바탕 그라데이션이 중요해서 그 부분 가장 신경써서 부탁드립니다! 컬러는 ⭐️연한 파스텔톤⭐️으로 부탁드립니다. 바탕 화이트 부분 그라데이션으로 해주시되, 핑크색 하트 들어가는 부분에는 연핑크 그라데이션 넣어주셔도 될 것 같습니다!
// 10. 참고 사진:

import { TReservation } from "@/types/model/order/type";
import { format } from "date-fns";

export function splitString(input: string) {
  const lines = input.split("\n");

  return lines;
}

export function splitStrWhenMeetEnter(str: string) {
  const regex = /\n/g; // \n을 찾는 정규식

  const arr = str.trim().split(regex); // 문자열을 \n으로 분리하여 배열로 반환
  return arr;
}

export function removeBeforeColon(strArr: string[]) {
  const regex = /^[^:]*:\s*/; // : 이전의 문자열을 찾는 정규식

  return strArr.map((v) => {
    return v.replace(regex, ""); // : 이전의 문자열을 제거
  });
}

export function convertToReservationFormat(input: string[]): TReservation {
  const result: TReservation = {
    id: -1,
    name: "",
    phoneNumber: "",
    pickupDate: "",
    size: "1",
    flavor: "",
    backgroundColor: "",
    content: "",
    option: "",
    detailRequest: "",
    status: "REFUND_COMPLETED",
  };

  input.map((v) => {
    if (v.includes("예약자 성함")) {
      result.name = v[0];
    }
  });

  return result;
}

// 7. 이후부터 8전 까지는 모두 content

export function parseTextToJSON(text: string): TReservation {
  const lines = text.split("\n");
  const regex = /7\.\s*([\s\S]*?)(?=8\.)/;
  const result: Partial<TReservation> = {};

  //   1.예약자성함:
  // 2.연락처:
  // 3.픽업 날짜/요일/시간:(@월/@일/@요일/15:00)
  // 4.사이즈:(미니/1호/2호)
  // 5.맛:(기본/꿀꿀바/오레오/초코딸기)
  // 6.케이크바탕색:
  // 7.문구 / 문구색 :
  //   -케이크 위:
  //   -하판:
  // 8.보냉백+아이스팩/안함(택1):
  // 9.구체적인 요청사항:
  // 10.참고 사진:

  lines.forEach((line) => {
    if (line.includes("예약자성함")) {
      result.name = line.split(": ")[1];
    } else if (line.includes("연락처")) {
      result.phoneNumber = line.split(": ")[1];
    } else if (line.includes("픽업 날짜/요일/시간")) {
      const currentYear = new Date().getFullYear();

      const match = line.match(/@(\d+)\/@(\d+)\/@(\w+)\/(\d+:\d+)/);

      if (!match) return null;

      const month = match[1];
      const day = match[2];
      // 요일 정보는 파싱만 해두었고 실제로 사용되진 않았습니다. 필요하다면 추가 작업이 필요합니다.
      const weekday = match[3];
      const time = match[4];

      const parsedDate = new Date(`${currentYear}-${month}-${day} ${time}`);

      result.pickupDate = new Date(
        format(parsedDate, "yyyy-MM-dd HH:mm")
      ).toISOString();
    } else if (line.includes("사이즈")) {
      result.size = line.split(": ")[1];
    } else if (line.includes("시트")) {
      result.flavor = line.split(": ")[1];
    } else if (line.includes("케이크바탕색")) {
      result.backgroundColor = line.split(": ")[1];
    } else if (line.includes("문구 / 문구색")) {
      const content = regex.exec(text);
      result.content = content ? content[1].trim().replace(/\\n/g, "s") : "";
    } else if (line.includes("보냉백+아이스팩/아이스팩/안함(택1)")) {
      result.option = line.split(": ")[1];
    } else if (line.includes("구체적인 요청사항")) {
      result.detailRequest = line.split(": ")[1];
    }
  });

  return result as TReservation;
}
