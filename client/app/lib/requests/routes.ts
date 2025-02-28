import { API_ROOT_URL } from "../constants";

export const API_ROUTES = {
  get_all_projects: () => `${API_ROOT_URL}/project`,
  get_first_project: () => `${API_ROOT_URL}/project/first`,
  get_events: (projectId: string) => `${API_ROOT_URL}/event/${projectId}`,
  get_grouped_events: (projectId: string, eventName: string) =>
    `${API_ROOT_URL}/event/${projectId}/group/${eventName}`,
  get_specific_events: (projectId: string, eventName: string) =>
    `${API_ROOT_URL}/event/${projectId}/filter/${eventName}`,
};
