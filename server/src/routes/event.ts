import express from "express";

import {
  filterEvents,
  getEvents,
  groupEvents,
  newEvent,
} from "../controllers/event";

export const eventRouter = express.Router();

eventRouter.post("/:projectId", newEvent);

eventRouter.get("/:projectId", getEvents);

eventRouter.get("/:projectId/group/:eventName", groupEvents);

eventRouter.get("/:projectId/filter/:eventName", filterEvents);
