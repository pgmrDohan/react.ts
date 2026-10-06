import {type RouteConfig, route, index} from "@react-router/dev/routes";

export default [
  index("pages/Home/index.tsx"),
  route("example", "pages/Example/index.tsx"),
  // route("posts/:slug", "pages/Post/index.tsx"),
] satisfies RouteConfig;
