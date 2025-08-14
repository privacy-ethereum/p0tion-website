import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address: string = "") {
  if (!address) return "";
  if (address.length <= 8) return address;
  return `${address?.slice(0, 8)}...${address?.slice(-8)}`;
}
