import { Children } from "react";

import GroupedEvent from "./grouped-event";
import GroupedEventCard from "./grouped-event-card";

import type { GroupedEventsProps } from "types";

const EventsByName = ({
  events = [],
}: {
  events: GroupedEventsProps<"name">[];
}) => {
  return (
    <GroupedEventCard className="border-l-0">
      <GroupedEventCard.Title>By Name</GroupedEventCard.Title>
      <GroupedEventCard.Content>
        {Children.toArray(
          events.map((item: GroupedEventsProps<"name">, index) => (
            <GroupedEvent
              name={item.name}
              count={item._count.name}
              key={`${item.name}-${index}`}
              isLink
            />
          ))
        )}
      </GroupedEventCard.Content>
    </GroupedEventCard>
  );
};

export default EventsByName;
