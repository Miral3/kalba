import React from "react";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";
import Common from "./common";

const style = css`
  body {
    margin: 0;
    color: ${Common.colors.black[0]};
    background-color: ${Common.colors.gray[0]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    min-height: calc(100vh - 262px);
  }

  @media (min-width: 768px) {
    main {
      min-height: calc(100vh - 270px);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ${reset}
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
