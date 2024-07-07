import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import { compression } from "vite-plugin-compression2";
const manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "SMF Tech.",
    short_name: "SMF Tech.",
    description: "Conference Application",
    icons: [
      {
        src: "/smf.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/smf.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/smf.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/smf.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugIn),
    obfuscatorPlugin({
      include: ["src/firebase/firebase.config.js"],
      exclude: [/node_modules/],
      apply: "build",
      debugger: true,
      options: {
        debugProtection: true,
      },
    }),
    compression()
  ],
  server: {
    open: true,
    hmr: {
      overlay: false,
    },
  },
  build: {
    manifest: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
