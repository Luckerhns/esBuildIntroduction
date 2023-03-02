import path from "path";
import ESBuild from "esbuild";
import config, { isDev } from "./esbuild-config";
import express from "express";
import { EventEmitter } from "events";

const PORT = Number(process.env.PORT) || 3000;

const app = express();
const emitter = new EventEmitter();

app.listen(PORT, () =>
  console.log("server started on http://localhost:" + PORT)
);

app.get("subscribe", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "Keep alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  emitter.on("refresh", () => {
    res.write("data: message");
  });
});

app.use(express.static(path.resolve(__dirname, "..", "..", "build")));

ESBuild.context({
  ...config,
})
  .then((ctx) => {
    ctx.watch();
  })
  .catch((e) => {
    console.log(e);
  });
