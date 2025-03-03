import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EventProps, ProjectProps, SelectOption } from "types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseOptions(options: ProjectProps[] = []): SelectOption[] {
  let parsedOptions = options.map((option: ProjectProps) => {
    return { label: option?.name, value: option?.id };
  });

  return parsedOptions;
}

export const formatTimestamp = (timestamp: Date): string => {
  const date = new Date(timestamp);

  return date.toLocaleString();
};

export const timeAgo = (timestamp: Date): string => {
  const now = new Date();
  const eventTime = new Date(timestamp);
  const seconds = Math.round((now.getTime() - eventTime.getTime()) / 1000);
  if (seconds < 10) return "just now"; // Add precision

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ] as const;

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return rtf.format(-count, interval.label);
  }

  return "just now";
};

export const parseEventContent = (
  event: EventProps
): { [key: string]: any } => {
  const { location, properties, timestamp, sessionId } = event;
  return {
    location,
    timestamp: formatTimestamp(timestamp),
    session_id: sessionId,
    ...properties,
  };
};
