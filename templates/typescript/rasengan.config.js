import { defineConfig } from 'rasengan';

export default defineConfig({
  reactStrictMode: true,

  // Define aliases
  vite: {
    resolve: {
      alias: [
        {
          find: "@pages",
          replacement: "src/pages"
        },
        {
          find: "@components",
          replacement: "src/components"
        },
        {
          find: "@assets",
          replacement: "src/assets"
        },
        {
          find: "@styles",
          replacement: "src/styles"
        }
      ]
    }
  }
});