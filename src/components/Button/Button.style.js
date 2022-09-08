import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const LogoutButton = css`
  padding: 10px 16px;
  border: 1px solid ${Common.colors.gray[3]};
  border-radius: 4px;
  background-color: ${Common.colors.gray[0]};
  font-size: ${Common.fontSize.b[2]};
  font-weight: 600;
  color: ${Common.colors.black[0]};
`;

const TextButton = css`
  margin: 0;
  padding: 0;
  background-color: transparent;
`;

const LoginButton = css``;
const DownloadButton = css``;

const Hover = css`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.5);
    transition: 0.2s;
    opacity: 0;
  }
  &:hover {
    color: #333;
  }
  &:hover::before {
    opacity: 1;
  }
`;

export const Button = styled.button`
  position: relative;
  border: 0;
  cursor: pointer;

  ${({ version }) => {
    switch (version) {
      case "logout":
        return LogoutButton;
      case "text":
        return TextButton;
      case "login":
        return LoginButton;
      case "download":
        return DownloadButton;
      default:
        break;
    }
  }}

  ${({ hover }) => hover && Hover};
`;
