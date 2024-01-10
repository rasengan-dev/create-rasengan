import { adaptPath } from "rasengan";

/** @type {import('tailwindcss').Config} */
export default {
  content: adaptPath(["./index.html", "./src/**/*.{ts,tsx,js,jsx}"]),
  theme: {
    extend: {
      colors: {
        primary: "#2A7FFF",
      },
    },
  },
  plugins: [],
};
