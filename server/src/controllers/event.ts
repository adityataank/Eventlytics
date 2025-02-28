import { Request, Response } from "express";

import { asyncHandler } from "../utils/helpers";
import { validateEventPayload } from "../utils/validator";
import { invalidRequest, successResponse } from "../utils/write-json";

import {
  createEvent,
  fetchEvents,
  filterEventsByEventName,
  groupEventsByKey,
} from "../services/event";

export const newEvent = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const projectId = req.params.projectId;

  const error = validateEventPayload(payload);

  if (error || !projectId) {
    return invalidRequest(res, "Invalid request");
  }

  await createEvent(payload, projectId);

  successResponse(res, { message: "Event created successfully" },201);
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params?.projectId;

  if (!projectId) return invalidRequest(res, "Invalid request");

  const events = await fetchEvents(projectId);

  successResponse(res, { events, message: "Events fetched successfully" });
});

export const groupEvents = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, eventName } = req.params;

  if (!(projectId || eventName))
    return invalidRequest(res, "Params are missing");

  const groupedEvents = await groupEventsByKey(projectId, eventName);

  successResponse(res, { events: groupedEvents });
});

export const filterEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, eventName } = req.params;

    if (!(projectId || eventName))
      return invalidRequest(res, "Params are missing");

    const filteredEvents = await filterEventsByEventName(projectId, eventName);

    successResponse(res, { events: filteredEvents });
  }
);
