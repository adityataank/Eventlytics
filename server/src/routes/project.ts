import express from "express";

import { getProjects, newProject } from "../controllers/project";

export const projectRouter = express.Router();

projectRouter.post("/", newProject);

projectRouter.get("/", getProjects);
