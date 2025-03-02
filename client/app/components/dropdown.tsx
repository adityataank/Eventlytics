import { Children } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import type { DropdownProps, SelectOption } from "types";

import { cn } from "~/lib/utils";

const Dropdown = ({
  options = [],
  onSelect,
  placeholder,
  defaultValue = "",
  className = "",
}: DropdownProps) => {
  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue}>
      <SelectTrigger value={"ad"} className={cn("h-11 md:w-3/12 md:min-w-64", className)}>
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        {Children.toArray(
          options.map((option: SelectOption) => {
            return (
              <SelectItem key={option?.value} value={option?.value}>
                {option?.label}
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
