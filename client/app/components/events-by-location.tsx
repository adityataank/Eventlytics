import { Children } from "react";

import GroupedEvent from "./grouped-event";
import GroupedEventCard from "./grouped-event-card";

import type { GroupedEventsProps } from "types";

const EventsByLocation = ({
  events = [],
}: {
  events: GroupedEventsProps<"location">[];
}) => {
  return (
    <GroupedEventCard className="border-r-0">
      <GroupedEventCard.Title>By Location</GroupedEventCard.Title>
      <GroupedEventCard.Content>
        {Children.toArray(
          events.map((item: GroupedEventsProps<"location">, index) => (
            <GroupedEvent
              name={item.location}
              count={item._count.location}
              key={`${item.location}-${index}`}
            />
          ))
        )}
      </GroupedEventCard.Content>
    </GroupedEventCard>
  );
};

export default EventsByLocation;
