import Back from "~/components/back";
import Container from "~/components/container";
import type { Route } from "./+types/event";
import { REQUEST } from "~/lib/requests";
import { API_ROUTES } from "~/lib/requests/routes";
import { Children } from "react";
import EventAccordion from "~/components/event-accordion";
import type { EventProps } from "types";

export async function loader({ params }: Route.LoaderArgs) {
  const { projectId, eventName } = params;

  const data = await REQUEST.get(
    API_ROUTES.get_specific_events(projectId, eventName)
  );

  return { events: data?.events ?? [], projectId };
}

export default function Event({
  loaderData: { events = [], projectId },
}: Route.ComponentProps) {
  return (
    <section className="h-[calc(100dvh-176px)] p-4 flex flex-col gap-4 animate-in slide-in-from-bottom-full duration-500 md:p-8 xl:max-w-7xl xl:mx-auto md:h-[calc(100dvh-96px)]">
      <Container>
        <Container.Title>
          <Back projectId={projectId} />
        </Container.Title>
        <Container.Content className="overflow-y-auto">
          {Children.toArray(
            events.map((event: EventProps) => (
              <EventAccordion key={event.id} {...event} />
            ))
          )}
        </Container.Content>
      </Container>
    </section>
  );
}
