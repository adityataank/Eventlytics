import { db } from "../app";
import { ProjectType } from "../types/project";

export const fetchProjects = async (userId: string) => {
  const projects = await db.project.findMany({ where: { ownerId: userId } });
  return projects;
};

export const createProject = async (payload: ProjectType, userId: string) => {
  const { name } = payload ?? {};
  try {
    const project = await db.project.create({
      data: { name, ownerId: userId },
    });
    return [project.id, null];
  } catch (error: any) {
    return [null, error?.code];
  }
};
