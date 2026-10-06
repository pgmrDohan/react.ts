import type {Config} from "@react-router/dev/config";
import path from "path";

export default {
  appDirectory: path.resolve(import.meta.dirname, "../src"),
  buildDirectory: path.resolve(import.meta.dirname, "../dist"),
  ssr: false,
  async prerender({getStaticPaths}) {
    return getStaticPaths();
    // return [...getStaticPaths(), "/posts/hello"];
  },
} satisfies Config;
