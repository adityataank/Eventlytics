import { Link, useParams } from "react-router";

import ArrowIcon from "./ui/icons/arrow";

const GroupedEvent = ({
  name,
  count,
  isLink = false,
}: {
  name: string;
  count: number;
  isLink?: boolean;
}) => {
  const [firstText] = name.split(",");

  const { projectId } = useParams();

  const Body = () => (
    <>
      <div className="flex items-center gap-2 w-fit">
        <span className="truncate">{firstText}</span>
        {isLink ? (
          <ArrowIcon className="ml-auto transition-transform group-hover:translate-x-1/2" />
        ) : null}
      </div>
      <span className="w-[3ch] text-right">{count}</span>
    </>
  );

  return isLink ? (
    <Link
      to={`/project/${projectId}/${name}`}
      viewTransition
      className="flex items-center text-sm px-4 py-1 justify-between group"
    >
      <Body />
    </Link>
  ) : (
    <div className="flex items-center text-sm px-4 py-1 justify-between group">
      <Body />
    </div>
  );
};

export default GroupedEvent;
