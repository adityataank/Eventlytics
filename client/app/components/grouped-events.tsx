import type { GroupedEventsComponentProps } from "types";
import Container from "./container";
import EventsByName from "./events-by-name";
import EventsByLocation from "./events-by-location";

const GroupedEvents = ({
  eventsByName,
  eventsByLocation,
}: GroupedEventsComponentProps) => {
  return (
    <Container className="animate-in slide-in-from-right-[200%] duration-700 overflow-auto">
      <Container.Title>Overview</Container.Title>
      <Container.Content className="overflow-auto grid grid-cols-2 gap-2 h-full px-0">
        <EventsByName events={eventsByName} />
        <EventsByLocation events={eventsByLocation} />
      </Container.Content>
    </Container>
  );
};

export default GroupedEvents;
