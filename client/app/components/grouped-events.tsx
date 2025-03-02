import type { GroupedEventsComponentProps } from "types";
import Container from "./container";
import EventsByName from "./events-by-name";
import EventsByLocation from "./events-by-location";

const GroupedEvents = ({
  eventsByName,
  eventsByLocation,
}: GroupedEventsComponentProps) => {
  const MobileSection = () => (
    <Container className="overflow-auto md:hidden">
      <Container.Title>Overview</Container.Title>
      <Container.Content className="overflow-auto grid grid-cols-2 gap-2 h-full px-0">
        <EventsByName events={eventsByName} />
        <EventsByLocation events={eventsByLocation} />
      </Container.Content>
    </Container>
  );

  const DesktopSection = () => (
    <div className="w-full flex-col gap-4 hidden h-full md:flex">
      <Container className="overflow-y-auto">
        <Container.Title>Name</Container.Title>
        <Container.Content className="overflow-y-auto">
          <EventsByName events={eventsByName} />
        </Container.Content>
      </Container>
      <Container className="overflow-y-auto">
        <Container.Title>Location</Container.Title>
        <Container.Content className="overflow-y-auto">
          <EventsByLocation events={eventsByLocation} />
        </Container.Content>
      </Container>
    </div>
  );

  return (
    <div className="h-full animate-in slide-in-from-right-[200%] duration-700 w-full">
      <MobileSection />
      <DesktopSection />
    </div>
  );
};

export default GroupedEvents;
