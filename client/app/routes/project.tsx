import { REQUEST } from "~/lib/requests";
import { API_ROUTES } from "~/lib/requests/routes";

import Events from "~/components/events";
import GroupedEvents from "~/components/grouped-events";

import type { EventProps, GroupedEventsProps } from "types";
import type { Route } from "./+types/project";

export async function loader({ params }: Route.LoaderArgs) {
  const { projectId } = params;
  if (projectId) {
    const resolvedData = await Promise.all([
      REQUEST.get(API_ROUTES.get_events(projectId)),
      REQUEST.get(API_ROUTES.get_grouped_events(projectId, "name")),
      REQUEST.get(API_ROUTES.get_grouped_events(projectId, "location")),
    ]);

    const events = resolvedData[0].events as EventProps[];
    const eventsByName = resolvedData[1].events as GroupedEventsProps<"name">[];
    const eventsByLocation = resolvedData[2]
      .events as GroupedEventsProps<"location">[];
    return { events, eventsByName, eventsByLocation };
  }
  return {};
}

export default function Project({
  loaderData: { events, eventsByName, eventsByLocation },
}: Route.ComponentProps) {
  return (
    <section className="h-[calc(100dvh-176px)] p-4 flex flex-col gap-4 md:h-[calc(100dvh-96px)] md:p-8 md:flex-row xl:max-w-7xl xl:mx-auto">
      {events && <Events events={events} />}
      {eventsByName && (
        <GroupedEvents
          eventsByName={eventsByName}
          eventsByLocation={eventsByLocation}
        />
      )}
    </section>
  );
}
