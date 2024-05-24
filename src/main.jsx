import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import App_Context from "./Context/App_Context.jsx";
import Initial_Loader from "./Components/Initial_Loader/Initial_Loader.jsx";
const App = lazy(() => import("./App.jsx"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Initial_Loader />}>
    <App_Context>
      <NextUIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NextUIProvider>
    </App_Context>
  </Suspense>
);
