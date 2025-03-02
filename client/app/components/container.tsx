import type { ReactChildren } from "types";
import { cn } from "~/lib/utils";

function Container({ children, className = "" }: ReactChildren) {
  return (
    <div
      className={cn(
        "rounded-md shadow-xl bg-white flex flex-col gap-2 h-full w-full md:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function Title({ children, className = "" }: ReactChildren) {
  return (
    <h5 className={cn("text-xl font-semibold p-4 pb-0 md:p-8 md:pb-0 md:text-2xl", className)}>
      {children}
    </h5>
  );
}

function Content({ children, className = "" }: ReactChildren) {
  return <div className={cn("p-4 pt-0 md:p-8 md:pt-0", className)}>{children}</div>;
}

Container.Title = Title;
Container.Content = Content;

export default Container;
