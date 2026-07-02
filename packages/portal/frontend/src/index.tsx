import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const argStr = args.map(a => String(a)).join(' ');
    if (argStr.includes('ZN-ERR') || argStr.includes('ZenithNexus')) {
      originalError(...args);
    }
  };
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
