import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const NavigationInput = css`
  padding: 5px 7px 5px 12px;
  outline: none;
  border: none;

  &[type="text"] {
    transform: scale(0.75);
    transform-origin: left;
  }
`;

const AuthInput = css`
  position: relative;
  z-index: 2;
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${Common.colors.white[0]};
  font-size: ${Common.fontSize.b[1]};

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
