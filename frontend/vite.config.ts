import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const inDocker = fs.existsSync("/.dockerenv");
const apiTarget = process.env.VITE_API_PROXY ?? (inDocker ? "http://node-backend:8000" : "http://localhost:8000");

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
