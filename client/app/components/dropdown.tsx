import { Children } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { DropdownProps, SelectOption } from "types";

const Dropdown = ({
  options = [],
  onSelect,
  placeholder,
  defaultValue = "",
}: DropdownProps) => {
  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue}>
      <SelectTrigger
        value={"ad"}
        className="h-11"
      >
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
