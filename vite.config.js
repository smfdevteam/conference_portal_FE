import { defineConfig } from "vite";
import {VitePWA} from 'vite-plugin-pwa'
import react from "@vitejs/plugin-react-swc";
import envCompatible from 'vite-plugin-env-compatible';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() , envCompatible() , VitePWA({
    registerType :'autoUpdate'
  })],
  server: {
    open: true,
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
