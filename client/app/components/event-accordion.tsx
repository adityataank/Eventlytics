import { Children } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { parseEventContent, timeAgo } from "~/lib/utils";
import { KEYS_TO_HIDE } from "~/lib/constants";

import type { EventProps } from "types";

function EventAccordion(props: EventProps) {
  const { id, name, timestamp } = props;
  const eventTime = timeAgo(timestamp);
  const eventBody = parseEventContent(props);

  return (
    <Accordion type="single" collapsible className="border-b-1 last:border-0">
      <AccordionItem value={id}>
        <AccordionTrigger>
          <span className="grid grid-cols-[70%_auto] w-full">
            <p className="truncate">{name}</p>
            <p className="flex items-center justify-end font-normal text-xs text-neutral-500 whitespace-nowrap md:text-sm">
              {eventTime}
            </p>
          </span>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 gap-2 pt-0 xl:grid-cols-2">
          {Children.toArray(
            Object.entries(eventBody).map(([key, value], index) =>
              value && !KEYS_TO_HIDE.includes(key) ? (
                <p key={index} className="grid grid-cols-[100px_1fr] gap-2">
                  <span className="text-neutral-700 font-medium">{key}</span>
                  <span className="truncate" title={value}>
                    {value}
                  </span>
                </p>
              ) : null
            )
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default EventAccordion;
