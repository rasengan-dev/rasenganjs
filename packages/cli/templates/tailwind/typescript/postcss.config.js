import { adaptPath } from "rasengan";

export default {
  plugins: {
    tailwindcss: {
      config: adaptPath("./tailwind.config"),
    },
    autoprefixer: {},
  },
};
