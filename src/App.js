import React from "react";
import { Global } from "@emotion/react";
import reset from "./styles/reset";

function App() {
  return (
    <div>
      <Global styles={reset} />
    </div>
  );
}

export default App;
