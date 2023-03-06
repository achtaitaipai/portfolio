import { defineConfig } from "vite";
import { dedale } from "vite-plugin-dedale";
import { data } from "./ssg/data";

export default defineConfig({
  plugins: [
    dedale({
      templateDir: "views",
      templateEngine: "edge",
      routes: [
        {
          url: "/",
          template: "index.edge",
          data,
        },
      ],
    }),
  ],
});
