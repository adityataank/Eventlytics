import { Link, useParams } from "react-router";

import { Analytics } from "~/lib/analytics";

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

  const handleLinkClick = () => {
    Analytics.track("event-name-click", {
      project_id: projectId,
      event_name: name,
    });
  };

  const Body = () => (
    <>
      <div className="flex items-center gap-2 w-fit">
        <span className="truncate">{firstText?.trim()}</span>
        {isLink ? (
          <ArrowIcon className="ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:w-4 md:h-4" />
        ) : null}
      </div>
      <span className="w-[3ch] text-right">{count}</span>
    </>
  );

  return isLink ? (
    <Link
      to={`/project/${projectId}/${name}`}
      onClick={handleLinkClick}
      className="flex items-center text-sm px-4 py-1 justify-between group md:px-0 md:text-[16px]"
      viewTransition
    >
      <Body />
    </Link>
  ) : (
    <div className="flex items-center text-sm px-4 py-1 justify-between group md:px-0 md:text-[16px]">
      <Body />
    </div>
  );
};

export default GroupedEvent;
