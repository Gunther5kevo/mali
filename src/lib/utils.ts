import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKES(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000) return `KES ${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `KES ${(amount / 1_000).toFixed(0)}k`;
    return `KES ${amount}`;
  }
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, signed = false): string {
  const sign = signed && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatKES(value, true)}`;
}
