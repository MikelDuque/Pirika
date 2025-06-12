import clsx from "clsx";
import { ClassValue } from "clsx";
import { camelCase } from "lodash";
import { IconName } from "lucide-react/dynamic";
import { twMerge } from "tailwind-merge";

/* ----- CN ----- */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

/* ----- OTHERS ----- */
export function getFirstChar(text?: string) {
  return text?.[0] ?? '?';
}

export function getIcon(iconName: string) {
  return camelCase(iconName) as IconName;
}

export function getFromStorage<T>(key: string) {
  const storageItem = localStorage.getItem(key) || sessionStorage.getItem(key);
  return storageItem ? JSON.parse(storageItem) as T : undefined;
}