import { Dispatch, SetStateAction } from "react";

export function isWorkDay(
  dates: (Date | string)[]
): { date: Date; isWeekend: boolean }[] {
  return dates.map((date) => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    const isWeekend = validDate.getDay() === 0 || validDate.getDay() === 6;
    return { date: validDate, isWeekend };
  });
}

export function createVlTimeArray(
  dates: string[],
  value: number,
  startIndex: number,
  endIndex: number
) {
  const vlTimeArray = new Array(dates.length).fill(null);

  for (let i = startIndex; i <= endIndex; i++) {
    vlTimeArray[i] = value;
  }

  return vlTimeArray;
}

export const formatDateEn = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateBr = (isoString: Date | string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR");
};
