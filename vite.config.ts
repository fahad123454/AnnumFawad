import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // Disable source maps so original source is never exposed in DevTools
    sourcemap: false,

    // Use terser for stronger minification and obfuscation
    minify: "terser",
    terserOptions: {
      compress: {
        // Strip all console.* calls
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // Multiple compression passes for tighter output
        passes: 3,
        collapse_vars: true,
        dead_code: true,
      },
      mangle: {
        // Rename all local variables and function names
        toplevel: true,
      },
      format: {
        // Remove all comments from the output bundle
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        // Hash-only filenames — no readable names in the network tab
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",

        // Separate vendor chunk to reduce fingerprinting of your own code
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}));