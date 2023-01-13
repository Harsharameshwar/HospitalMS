import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const root = ReactDOM.createRoot(document.getElementById("root"));
const engine = new Styletron();
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
            <App />
        </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
