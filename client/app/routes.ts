import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/entry.tsx"),
  route("/project", "routes/dashboard.tsx", [
    route(":projectId", "routes/project.tsx"),
    route(":projectId/:eventName", "routes/event.tsx"),
  ]),
] satisfies RouteConfig;
