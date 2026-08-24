import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Optional proxy-target override, read without requiring @types/node in the
// browser toolchain.
const env =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

// The dev server binds 0.0.0.0:5173 (matching the compose port) and proxies
// API calls to the backend container so the frontend can use same-origin
// requests (no CORS needed). Override the target with VITE_PROXY_TARGET when
// running outside docker (e.g. http://localhost:8001).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: env.VITE_PROXY_TARGET || 'http://node-backend:8000',
        changeOrigin: true,
      },
    },
  },
});
