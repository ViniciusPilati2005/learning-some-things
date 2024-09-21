import { defineConfig } from "vite";
import path from "path";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [ TanStackRouterVite() ,viteReact()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});