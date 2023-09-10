// enum OrderStatus {
//   CONSULTING = '상담중',
//   CONSULTATION_CANCELLED = '상담취소',
//   PAYMENT_COMPLETED = '결제완료',
//   DESIGN_IN_PROGRESS = '도안제작중',
//   PRODUCTION_IN_PROGRESS = '제작중',
//   PRODUCTION_COMPLETED = '제작완료',
//   PICKUP_COMPLETED = '픽업완료',
// }

export type TOrderStatus =
  | "PAYMENT_COMPLETED"
  | "PRODUCTION_COMPLETED"
  | "PICKUP_COMPLETED"
  | "REFUND_COMPLETED";

type OrderStatusValue = {
  label: string;
  color: string;
  value: TOrderStatus;
};

type TOrderStatusMap = {
  [key in TOrderStatus]: OrderStatusValue;
};

export const OrderStatus: TOrderStatusMap = {
  PAYMENT_COMPLETED: {
    label: "입금완료",
    color: "blue",
    value: "PAYMENT_COMPLETED",
  },
  PRODUCTION_COMPLETED: {
    label: "작업완료",
    color: "purple",
    value: "PRODUCTION_COMPLETED",
  },
  PICKUP_COMPLETED: {
    label: "픽업완료",
    color: "green",
    value: "PICKUP_COMPLETED",
  },
  REFUND_COMPLETED: {
    label: "환불완료",
    color: "gray",
    value: "REFUND_COMPLETED",
  },
};

// type TCakeType = 'mini' | '1' | '2' | '3'

// type CakeTypeValue = {
//     label: string
//     color: string
//     value: TCakeType
// }

// type TCakeTypeValueMap = {
//     [key in TCakeType]: CakeTypeValue
// }

// const CakeType: TCakeTypeValueMap = {
//     mini : {
//         value : 'mini',
//         label : '1호',
//         color : ''
//     }
// }

// type TSize = '1' | '2' | '3' | 'mini'

export type TFlavor = "strawberry" | "strawberry_chocolate" | "pig" | "oreo";

export const FlavorMap: {
  [key in TFlavor]: string;
} = {
  strawberry: "기본 딸기잼",
  strawberry_chocolate: "초코 딸기",
  pig: "꿀꿀바",
  oreo: "오레오",
};

export type TOption = "보냉백 + 아이스팩" | "아이스팩" | "선택 안함";

export type TReservation = {
  name: string;
  phoneNumber: string;
  pickupDate: string | Date;
  size: string;
  flavor: TFlavor | string;
  backgroundColor: string;
  content: string;
  option?: TOption | string;
  detailRequest?: string;
  image?: string;
  status: TOrderStatus;
} & { id: number };
