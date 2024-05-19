import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App_Context from "./Context/App_Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App_Context>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </App_Context>
);
