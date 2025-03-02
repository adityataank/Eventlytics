import type { ReactChildren } from "types";
import { cn } from "~/lib/utils";

function GroupedEventCard({ children, className }: ReactChildren) {
  return (
    <div className={cn("py-4 flex flex-col gap-2 border md:border-0 md:py-0 md:gap-4", className)}>
      {children}
    </div>
  );
}

const Title = ({ children, className }: ReactChildren) => {
  return (
    <h5 className={cn("text-sm font-semibold text-gray-700 pl-4 md:hidden", className)}>
      {children}
    </h5>
  );
};

const Content = ({ children }: ReactChildren) => {
  return children;
};

GroupedEventCard.Title = Title;
GroupedEventCard.Content = Content;

export default GroupedEventCard;
