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

import { TReservation } from "@/_types/model/order/type";

// function splitStrWhenMeetEnter(str: string) {
//     const regex = /\n/g // \n을 찾는 정규식

//     const arr = str.trim().split(regex) // 문자열을 \n으로 분리하여 배열로 반환
//     return arr
// }

// function removeBeforeColon(strArr: string[]) {
//     const regex = /^[^:]*:\s*/ // : 이전의 문자열을 찾는 정규식

//     return strArr.map((v) => {
//         return v.replace(regex, '') // : 이전의 문자열을 제거
//     })
// }

// // function formatToOrderObject(arr: string[]): TReservation {
// //     const result: TReservation = {
// //         key: uuidv4(),
// //         status: '',
// //         name: '',
// //         phoneNumber: '',
// //         schedule: {
// //             date: '',
// //             day: '',
// //             time: '',
// //         },
// //         size: '',
// //         sheet: '',
// //         backgroundColor: '',
// //         paragraph: '',
// //         paragraphColor: '',
// //         createdAt: new Date(),
// //         extra: '',
// //     }

// //     arr.forEach((v, i) => {
// //         const key: keyof Test = keyMap[i]
// //         result[key] = v
// //     })

// //     const [size, sheet] = result.size.split('/')

// //     result.sheet = sheet
// //     result.size = size

// //     result.phoneNumber = result.phoneNumber.replace(
// //         /(\d{3})(\d{3,4})(\d{4})/,
// //         '$1-$2-$3'
// //     )

// //     const [date, day, time] = result.schedule.split('/')
// //     const schedule: { date: string; day: string; time: string } = {
// //         date,
// //         day,
// //         time,
// //     }

// //     result.schedule = schedule

// //     return result
// // }

// function parseDate(dateString: string): Date | null {
//     const pattern = /(\d{1,2})월(\d{1,2})일\/(\d{1,2})시/
//     const match = dateString.match(pattern)

//     if (!match) {
//         return null
//     }

//     const month = parseInt(match[1], 10) - 1 // 월은 0부터 시작하기 때문에 1을 뺍니다.
//     const date = parseInt(match[2], 10)
//     const hour = parseInt(match[3], 10)

//     const now = new Date()
//     const year = now.getFullYear()
//     // Date 객체를 생성합니다.
//     const result = new Date(year, month, date, hour)

//     return result
// }

// function validateInput(str: string) {
//     if (str === '') {
//         return false
//     }
//     return true
// }

// function getTodaysDate(dateString: string): Date | null {
//     const pattern = /(\d{1,2})월(\d{1,2})일\//
//     const match = dateString.match(pattern)

//     if (!match) {
//         return null
//     }

//     const month = parseInt(match[1], 10) - 1 // 월은 0부터 시작하기 때문에 1을 뺍니다.
//     const date = parseInt(match[2], 10)

//     const now = new Date()
//     const year = now.getFullYear()
//     // Date 객체를 생성합니다.
//     const result = new Date(year, month, date)

//     return result
// }

// function isToday(date: Date | null): boolean {
//     if (date === null) {
//         return false
//     }

//     const today = new Date()
//     return (
//         date.getDate() === today.getDate() &&
//         date.getMonth() === today.getMonth() &&
//         date.getFullYear() === today.getFullYear()
//     )
// }

// export {
//     splitStrWhenMeetEnter,
//     removeBeforeColon,
//     // formatToOrderObject,
//     parseDate,
//     getTodaysDate,
//     isToday,
//     validateInput,
// }

// // input은 문자열
// // const order = formatToOrderObject(
// //     removeBeforeColon(splitStrWhenMeetEnter(input))
// //   );

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
    option: [],
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

export function parseReservationInfo(input: string): TReservation | null {
  // const regex = /7\.(.*?)8\./s;
  // const match = input.match(regex);
  // const content = match ? match[1].trim() : "";

  // const lines = input.split("\n");
  // const reservationInfo: Partial<TReservation> = {};
  // const contentLines = [];

  // for (const line of lines) {
  //   if (line.match(/^\d+\./)) {
  //     const parts = line.split(":");
  //     if (parts.length === 2) {
  //       const key = parts[0].trim();
  //       const value = parts[1].trim();
  //       switch (key) {
  //         case "1.예약자성함":
  //           reservationInfo.name = value;
  //           break;
  //         case "2.연락처":
  //           reservationInfo.phoneNumber = value;
  //           break;
  //         case "3.픽업 날짜/요일/시간":
  //           reservationInfo.pickupDate = new Date(value);
  //           break;
  //         case "4.사이즈":
  //           reservationInfo.size = value;
  //           break;
  //         case "5.시트":
  //           reservationInfo.flavor = value;
  //           break;
  //         case "6.케이크바탕색":
  //           reservationInfo.backgroundColor = value;
  //           break;
  //         case "7.문구 / 문구색":
  //           reservationInfo.content = content;
  //           break;
  //         case "8.보냉백+아이스팩/아이스팩/안함(택1)":
  //           reservationInfo.option = [value];
  //           break;
  //         case "9.구체적인 요청사항":
  //           reservationInfo.detailRequest = value;
  //           break;
  //         // Handle other cases if needed
  //       }
  //     }
  //   } else {
  //     contentLines.push(line);
  //   }
  // }

  // reservationInfo.content = contentLines.join("\n");

  // // Create and return the TReservation object
  // if (
  //   reservationInfo.name &&
  //   reservationInfo.phoneNumber &&
  //   reservationInfo.size &&
  //   reservationInfo.backgroundColor &&
  //   reservationInfo.content
  //   // Add more required fields as needed
  // ) {
  //   const reservation: TReservation = {
  //     id: Math.random(), // Set the appropriate id
  //     status: "PAYMENT_COMPLETED", // Set the initial status
  //     ...reservationInfo,
  //   };

  //   return reservation;
  // }

  return null;
}
