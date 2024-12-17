import { adaptPath } from "rasengan";

/** @type {import('tailwindcss').Config} */
export default {
  content: adaptPath(["./src/**/*.{ts,tsx,js,jsx}"]),
  theme: {
    extend: {
      colors: {
        primary: "#2A7FFF",
      },
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
