import * as esbuild from "esbuild";
import { Plugin } from "esbuild";
import { rm } from "fs/promises";

export let ClearPlugin: Plugin = {
  name: "ClearPlugin",
  setup(build) {
    build.onStart(async () => {
      try {
        const outdir = build.initialOptions.outdir;
        if (outdir) {
          // Attention!
          await rm(outdir, { recursive: true });
        }
      } catch (error) {
        console.log(error);
      }
    });

    build.onEnd(() => {
      console.log("Build end");
    });
  },
};
