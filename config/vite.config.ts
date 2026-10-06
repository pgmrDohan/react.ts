import {defineConfig} from "vite";
import {reactRouter} from "@react-router/dev/vite";
import path from "path";

export default defineConfig({
  root: path.resolve(import.meta.dirname, ".."),
  plugins: [reactRouter()],
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve(import.meta.dirname, "../src")},
    ],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
  },
  cacheDir: path.resolve(import.meta.dirname, "../.yarn/.vite"),
  optimizeDeps: {exclude: ["blip-ds/loader"]},
});
