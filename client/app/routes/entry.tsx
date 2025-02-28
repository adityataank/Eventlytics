import { redirect } from "react-router";

import { REQUEST } from "~/lib/requests";
import { API_ROUTES } from "~/lib/requests/routes";

export async function loader() {
  const data = await REQUEST.get(API_ROUTES.get_first_project());
  if (data?.project?.id) {
    const projectId = data?.project?.id;
    throw redirect(`/project/${projectId}`);
  }
}

export default function Entry() {
  return null;
}
