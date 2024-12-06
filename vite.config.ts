import { defineConfig } from "vite";
import dsv from "@rollup/plugin-dsv";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/ficus/",
  plugins: [react(), dsv()],
});
