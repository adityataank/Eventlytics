import MoveUpRight from "./svg/MoveUpRight";

import { cn } from "~/lib/utils";

const ArrowIcon = ({ className = "" }) => {
  return <MoveUpRight className={cn("w-[13px] h-[13px]", className)} />;
};

export default ArrowIcon;
