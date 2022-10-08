import React from "react";
import { Global, css } from "@emotion/react";
import reset from "emotion-reset";

const style = (theme) => css`
  body {
    margin: 0;
    color: ${theme.text.text};
    background-color: ${theme.bg.body};
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
