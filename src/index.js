import React from "react";
import ReactDOM from "react-dom/client";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import Common from "./styles/common";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Global
      styles={css`
        ${reset}
        body {
          background-color: ${Common.colors.gray[0]};
        }
      `}
    />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
