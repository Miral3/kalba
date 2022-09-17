import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const NavigationInput = css`
  padding: 5px 7px 5px 12px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: ${Common.fontSize.c[1]};
  line-height: ${Common.fontSize.h[1]};
`;

const AuthInput = css`
  position: relative;
  z-index: 2;
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: ${Common.fontSize.h[2]};
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${Common.colors.white[0]};

  ${({ version }) => {
    switch (version) {
      case "navigation":
        return NavigationInput;
      case "auth":
        return AuthInput;
      default:
        break;
    }
  }}
`;
