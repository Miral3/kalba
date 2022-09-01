import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const AuthButton = css`
  padding: 8px;
  border: 0;
  border-radius: 4px;
  background-color: ${Common.colors.indigo[1]};
  font-size: ${Common.fontSize.c[1]};
  font-weight: 600;
  color: ${Common.colors.white[0]};
  transition: all 0.2s ease 0s;

  &:hover {
    filter: brightness(1.1);
  }

  @media (min-width: ${Common.display.mobile}) {
    top: 10px;
    padding: 10px;
    font-size: ${Common.fontSize.b[2]};
  }
`;

const LoginButton = css``;
const DownloadButton = css``;

export const Button = styled.button`
  border: 0;
  cursor: pointer;

  ${({ version }) => {
    switch (version) {
      case "auth":
        return AuthButton;
      case "login":
        return LoginButton;
      case "download":
        return DownloadButton;
      default:
        break;
    }
  }}
`;
