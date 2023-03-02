import { Plugin } from "esbuild";
import { rm, writeFile } from "fs/promises";
import path from "path";

interface HTMLPluginOptions {
  template?: string;
  title: string;
  jsPath?: string[];
  cssPath?: string[];
}

const renderHTML = (options: HTMLPluginOptions): string => {
  return (
    options.template ||
    `
                      <!DOCTYPE html>
                      <html lang="en">
                          <head>
                          <meta charset="UTF-8" />
                          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                          ${options?.cssPath
                            ?.map(
                              (path) => `<link rel="stylesheet" href=${path} />`
                            )
                            .join(" ")}
                          <title>${options.title}</title>
                          </head>
                          <body>
                          <div id="root"></div>
                          ${options.jsPath
                            ?.map((path) => `<script src=${path}></script>`)
                            .join(" ")}
                          </body>
                      </html>
                `
  );
};

const preparePaths = (outputs: string[]) => {
  return outputs.reduce<Array<string[]>>(
    (acc, path) => {
      const [js, css] = acc;
      const splittedFileName = path.split("/").pop();

      if (splittedFileName?.endsWith(".js")) {
        js.push(splittedFileName);
      } else if (splittedFileName?.endsWith(".css")) {
        css.push(splittedFileName);
      }
      return acc;
    },
    [[], []]
  );
};

export const HTMLPlugin = (options: HTMLPluginOptions): Plugin => {
  return {
    name: "HTMLPlugin",
    setup(build) {
      const outdir = build.initialOptions.outdir;
      build.onStart(async () => {
        try {
          if (outdir) {
            await rm(outdir, { recursive: true });
          }
        } catch (error) {
          console.log(error);
        }
        build.onEnd(async (result) => {
          const outputs = result.metafile?.outputs;
          const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));
          console.log(result.metafile);
          if (outdir) {
            await writeFile(
              path.resolve(outdir, "index.html"),
              renderHTML({ jsPath, cssPath, ...options })
            );
          }
        });
      });
    },
  };
};
