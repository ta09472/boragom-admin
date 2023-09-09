import { TReservation } from "./type";

const data: TReservation[] = [
  {
    id: 1,
    name: "김범수",
    phoneNumber: "010-222-0222",
    pickupDate: "2023-09-07 15:00",
    size: "2",
    flavor: "white",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `        
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    option: "iceBag",
    detailRequest:
      "레터링과 바탕 그라데이션이 중요해서 그 부분 가장 신경써서 부탁드립니다!",
    status: "PICKUP_COMPLETED",
  },
  {
    id: 2,
    name: "박범수",
    phoneNumber: "010-222-0232",
    pickupDate: "2023-09-02 19:00",
    size: "1",
    flavor: "chocolate",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    option: "icePack",
    detailRequest: "컬러는 ⭐️연한 파스텔톤⭐️으로 부탁드립니다. ",
    status: "PRODUCTION_COMPLETED",
  },
  {
    id: 3,
    name: "최범수",
    phoneNumber: "010-222-0232",
    pickupDate: "2023-09-14 12:30",
    size: "mini",
    flavor: "화이트",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `        
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    status: "PAYMENT_COMPLETED",
  },
  {
    id: 4,
    name: "최범수",
    phoneNumber: "010-222-0232",
    pickupDate: "2023-09-09 12:30",
    size: "mini",
    flavor: "chocolate",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `        
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    status: "PAYMENT_COMPLETED",
  },
  {
    id: 5,
    name: "김슈수",
    phoneNumber: "010-222-0232",
    pickupDate: "2023-09-09 11:30",
    size: "mini",
    flavor: "chocolate",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `        
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    status: "PAYMENT_COMPLETED",
  },
  {
    id: 4,
    name: "박보경",
    phoneNumber: "010-222-0232",
    pickupDate: "2023-09-10 12:30",
    size: "mini",
    flavor: "chocolate",
    backgroundColor:
      "연한 파스텔톤의 연두색 (참고사진에 연두색 별 보다 살짝 연한 색)",
    content: `        
        문구 / 문구색 : 하얀색
        케이크 위:
        The Luck
        I Found (704)
        하판: HAPPY DUJUN DAY`,
    status: "PAYMENT_COMPLETED",
  },
];

export default function getReservation() {
  return data;
}
