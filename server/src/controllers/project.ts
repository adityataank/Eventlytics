import { Request, Response } from "express";

import { asyncHandler } from "../utils/helpers";
import { invalidRequest, successResponse } from "../utils/write-json";
import { validateNewProjectPayload } from "../utils/validator";

import { createProject, fetchProjects } from "../services/project";
import { MONGO_ERROR_CODES } from "../utils/constant";

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.headers.userId as string;

  const projects = await fetchProjects(userId);

  successResponse(res, { projects, message: "Projects fetched successfully" });
});

export const newProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.headers.userId as string;

  const payload = req.body;
  const error = validateNewProjectPayload(payload);
  if (error) return invalidRequest(res, error);

  const [id, dbError] = await createProject(payload, userId);

  if (dbError === MONGO_ERROR_CODES.DUPLICATE_ENTRY || !id) {
    return invalidRequest(res, "Project name is already used");
  }

  successResponse(res, {
    message: "New project created successfully",
    project_key: id,
  });
});
