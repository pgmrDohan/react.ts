import styles from "./index.module.scss";
import type {Route} from "./+types/index";

export const loader = () => ({title: "Example"});

export default function About({loaderData}: Route.ComponentProps) {
  return <h1>{loaderData.title}</h1>;
}
