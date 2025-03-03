import { Prisma } from "@prisma/client";
import { db } from "../app";
import { EventType } from "../types/event";

export const createEvent = async (payload: EventType, projectId: string) => {
  const { name, location, properties, session_id } = payload ?? {};

  await db.event.create({
    data: {
      name: name.trim().replace(/\s+/g, "-"),
      sessionId: session_id,
      properties,
      location,
      projectId,
    },
  });
};

export const fetchEvents = async (projectId: string) => {
  const events = await db.event.findMany({
    where: { projectId },
    orderBy: { timestamp: "desc" },
  });
  return events;
};

export const groupEventsByKey = async (
  projectId: string,
  eventName: string
) => {
  const groupedEvents = db.event.groupBy({
    by: eventName as Prisma.EventScalarFieldEnum,
    where: { projectId },
    _count: { [eventName]: true },
    orderBy: { _count: { [eventName]: "desc" } },
  });

  return groupedEvents;
};

export const filterEventsByEventName = async (
  projectId: string,
  eventName: string
) => {
  const filteredEvents = db.event.findMany({
    where: { projectId, name: eventName },
    orderBy: { timestamp: "desc" },
  });

  return filteredEvents;
};
