import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  plugins: [react({devTarget: "esnext"})],
  css: {preprocessorOptions: {scss: {api: "modern"}}},
  resolve: {
    alias: [{find: "@", replacement: path.resolve(__dirname, "../src")}],
    extensions: [".js", ".ts", ".jsx", ".tsx", ".scss"],
  },
  cacheDir: "../.yarn/.vite",
  optimizeDeps: {exclude: ["blip-ds/loader"]},
  build: {outDir: "../dist", emptyOutDir: true},
});
