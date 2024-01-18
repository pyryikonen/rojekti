// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    assetsDir: "assets",
    rollupOptions: {},
    plugins: [react()],
  },
});
