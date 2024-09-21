import { defineConfig } from "vite";
import path from "path";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});