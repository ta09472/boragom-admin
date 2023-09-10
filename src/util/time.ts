import { differenceInDays, differenceInSeconds, format } from "date-fns";
import dayjs from "dayjs";

export function calculateTimeRemaining(targetDateISO: string) {
  const targetDate = new Date(targetDateISO);
  const now = new Date();
  const secondsRemaining = differenceInSeconds(targetDate, now);

  if (secondsRemaining <= 0) {
    return "만료";
  }

  const daysRemaining = differenceInDays(targetDate, now);
  const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
  const minutes = Math.ceil((secondsRemaining % 3600) / 60);

  let formattedTime = "";

  if (daysRemaining >= 1) {
    formattedTime = format(new Date().setDate(daysRemaining), "dd HH:mm");
  } else {
    formattedTime = format(new Date().setHours(hours, minutes), "HH:mm");
  }

  formattedTime = formattedTime.replace(/^0(\d)/, "$1");

  return formattedTime;
}

export function addTextRestedTime(date: string) {
  const calculatedTime = calculateTimeRemaining(date);
  if (calculatedTime === "만료") return "만료 되었어요.";
  return `${calculatedTime
    .replace(" ", "일 ")
    .replace(":", "시간 ")}분 남았어요!`;
}

export function getDateByyyyyMMdd(date: Date | string) {
  return format(new Date(date), "yyyy-MM-dd");
}

export function getTimeByhhmm(date: Date | string) {
  return dayjs(new Date(date)).format("HH:mm");
}
