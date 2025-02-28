import express from "express";

import { firstProject, getProjects, newProject } from "../controllers/project";

export const projectRouter = express.Router();

projectRouter.post("/", newProject);

projectRouter.get("/", getProjects);

projectRouter.get("/first", firstProject);
