import "the-new-css-reset/css/reset.css";
import "@/styles/colors.scss";
import "@/styles/spacings.scss";
import "@/styles/typo.scss";

import {Layout as AppLayout} from "@/components";

import NotFound from "@/pages/NotFound";

import type {Route} from "./+types/root";

export {Document as Layout} from "./index";

export const meta: Route.MetaFunction = () => [
  {title: "React App"},
  {name: "description", content: "Web site created using create-react-app"},
];

export default function App() {
  return <AppLayout />;
}

export function HydrateFallback() {
  return null;
}

export function ErrorBoundary() {
  return <NotFound />;
}
