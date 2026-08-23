import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    env: {
      DB_HOST: "localhost",
      DB_PORT: "5433",
    },
  },
});
