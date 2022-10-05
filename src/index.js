import React from "react";
import ReactDOM from "react-dom/client";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { global } from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Global
      styles={css`
        ${reset}
        ${global}
      `}
    />
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
