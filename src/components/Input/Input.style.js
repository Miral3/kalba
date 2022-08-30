import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const NavigationInput = css`
  border: none;
  padding: 5px 7px;
  outline: none;
  font-size: ${Common.fontSize.c[1]};
  line-height: ${Common.fontSize.h[1]};
`;

const AuthInput = css`
  border: none;
  border-bottom: 1px solid ${Common.colors.gray[3]};
  padding-bottom: 8px;
  outline: none;
  font-size: ${Common.fontSize.h[2]};
`;

export const Input = styled.input`
  width: 100%;
  margin-left: 5px;

  ${({ type }) => {
    switch (type) {
      case "navigation":
        return NavigationInput;
      case "auth":
        return AuthInput;
      default:
        break;
    }
  }}
`;
