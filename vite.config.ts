import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react({
		devTarget: "esnext"
	})],
	cacheDir: ".yarn/.vite",
	optimizeDeps: {
    exclude: ['blip-ds/loader']
  }
});