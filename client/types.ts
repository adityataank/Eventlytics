import type { ReactNode } from "react";

export type ProjectProps = {
  id: string;
  name: string;
  createdAt: string;
  ownerId: string;
};

export type HeaderProps = {
  projects: ProjectProps[];
};

export type SelectOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  options: SelectOption[];
  onSelect: (option: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export type EventProps = {
  id: string;
  name: string;
  properties: { [key: string]: string };
  timestamp: Date;
  location: string;
};

export type EventComponentProps = {
  events: EventProps[];
};

export type GroupedEventsProps<T extends "name" | "location"> = {
  _count: T extends "name" ? { name: number } : { location: number };
} & (T extends "name" ? { name: string } : { location: string });

export type GroupedEventsComponentProps = {
  eventsByName: GroupedEventsProps<"name">[];
  eventsByLocation: GroupedEventsProps<"location">[];
};

export type ReactChildren = {
  children: ReactNode;
  className?: string;
};
