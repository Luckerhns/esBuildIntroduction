import ESBuild from "esbuild";
import path from "path";
import config from "./esbuild-config";

ESBuild.build(config).catch((e) => console.log(e));
