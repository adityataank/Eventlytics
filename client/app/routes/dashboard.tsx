import { Outlet } from "react-router";
import type { ShouldRevalidateFunctionArgs } from "react-router";

import Header from "~/components/header";

import { REQUEST } from "~/lib/requests";
import { API_ROUTES } from "~/lib/requests/routes";

import type { Route } from "./+types/dashboard";

export async function loader() {
  const data = await REQUEST.get(API_ROUTES.get_all_projects());

  return { projects: data.projects };
}

export function shouldRevalidate() {
  return false;
}

export default function Dashbaord({
  loaderData: { projects },
}: Route.ComponentProps) {
  return (
    <main className="pt-44 md:pt-24">
      <Header projects={projects} />
      <Outlet />
    </main>
  );
}
