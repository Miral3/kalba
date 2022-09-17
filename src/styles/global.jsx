import { css } from "@emotion/react";
import Common from "./common";

export const global = css`
  body {
    margin: 0;
    background-color: ${Common.colors.gray[0]};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    min-height: calc(100vh - 270px);
  }

  @media (min-width: 768px) {
    main {
      min-height: calc(100vh - 300px);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
