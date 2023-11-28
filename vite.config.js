import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/WorldWise/",
  plugins: [react(), eslint()],
  define: {
    global: {},
  },
  optimizeDeps: {
    include: ["interweave"],
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    target: "esnext",
    // minify: true,
    // cssCodeSplit: true,
  },
});
