import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toFirstUppercase(inputString: string) {
  // Check if the string is not empty
  if (inputString.length > 0) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  } else {
    return inputString; // Return the original string if it's empty
  }
}

export function isInArray(value: number | string, array: Array<string | number>) {
  return array.indexOf(value) !== -1;
}

export function checkObjectErrors(obj: Record<string, boolean>) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== true) {
      throw new Error(key);
    }
  }
}