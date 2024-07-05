import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalProvider from "./GlobalProvider.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <React.StrictMode>
      <MantineProvider>
        <App />
      </MantineProvider>
    </React.StrictMode>
  </GlobalProvider>
);
