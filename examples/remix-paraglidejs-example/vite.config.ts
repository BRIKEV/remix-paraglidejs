import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { paraglide } from "@inlang/paraglide-js-adapter-vite";

installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    paraglide({
      project: "./project.inlang", //Path to your inlang project 
      outdir: "./paraglide", //Where you want the generated files to be placed
    }),
  ],
});
