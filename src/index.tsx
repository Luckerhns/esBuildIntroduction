import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

// if (!rootElement) {
//   throw new Error();
// }

const root = createRoot(rootElement as HTMLElement);
root.render(<App />);
