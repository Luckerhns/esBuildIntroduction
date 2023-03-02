import { BuildOptions } from "esbuild";
import path from "path";
import { ClearPlugin } from "./plugins/ClearPlugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";

const mode = process.env.MODE || "development";
export const isDev = mode === "development";
const isProd = mode === "production";

function resolveRoot(...segments: string[]) {
  return path.resolve(__dirname, "..", "..", ...segments);
}

const config: BuildOptions = {
  outdir: resolveRoot("build"),
  entryPoints: [resolveRoot("src", "index.js")],
  entryNames: "[dir]/bundle.[name]-[hash]",
  allowOverwrite: true,
  bundle: true,
  tsconfig: resolveRoot("tsconfig.json"),
  minify: isProd,
  sourcemap: isDev,
  loader: {
    ".png": "file",
  },
  metafile: true,
  plugins: [
    ClearPlugin,
    HTMLPlugin({
      title: "Ulbi tv",
    }),
  ],
};

config;

export default config;
