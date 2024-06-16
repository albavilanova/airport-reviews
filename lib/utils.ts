import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPeriod(date: string) {
  var d1 = new Date(date);
  var d2 = new Date();

  // Get difference in years
  const years = d2.getFullYear() - d1.getFullYear();

  // Get difference in days
  const days = Math.floor((d2.valueOf() - d1.valueOf()) / (1000 * 3600 * 24));

  // Get difference in months
  let months;
  months = years * 12;
  months -= d1.getMonth();
  months += d2.getMonth();

  if (years > 0) {
    return years.toString() + " years ago";
  } else if (months > 0) {
    return months.toString() + " months ago";
  } else if (days > 1) {
    return days.toString() + " days ago";
  } else if (days === 1) {
    return "Yesterday";
  } else {
    return "Today";
  }
}

export function sortByKey(array: any, key: string, reverse: boolean) {
  const sortedArray = array.sort(function (a: any, b: any) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
  if (reverse) {
    return sortedArray.reverse();
  } else {
    return sortedArray;
  }
}
