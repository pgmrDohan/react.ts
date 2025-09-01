import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'path';

export default defineConfig({
	plugins: [react({
		devTarget: "esnext"
	})],
	css: { preprocessorOptions: { scss: { api: 'modern' } } },
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss'],
	},
	cacheDir: ".yarn/.vite",
	optimizeDeps: {
    exclude: ['blip-ds/loader']
  }
});
