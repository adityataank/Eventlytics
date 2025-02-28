import type { EventComponentProps, EventProps } from "types";
import Container from "./container";
import EventAccordion from "./event-accordion";

function Events({ events = [] }: EventComponentProps) {
  return (
    <Container className="animate-in slide-in-from-left-[200%] duration-700 overflow-auto">
      <Container.Title>Events</Container.Title>
      <Container.Content className="overflow-auto">
        {events.map((event: EventProps) => {
          return <EventAccordion key={event.id} {...event} />;
        })}
      </Container.Content>
    </Container>
  );
}

export default Events;
