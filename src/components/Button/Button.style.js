import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Common from "../../styles/common";

const LogoutButton = ({ theme }) => css`
  padding: 10px 16px;
  border: ${theme.border.logoutBtn};
  border-radius: 4px;
  background-color: ${theme.bg.logoutBtn};
  font-size: ${Common.fontSize.b[2]};
  font-weight: 600;
  color: ${theme.text.logoutBtn};
`;

const TextButton = css`
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

const LoginButton = ({ theme }) => css`
  padding: 16px;
  margin-top: 16px;
  background-color: ${Common.colors.red[0]};
  font-size: ${Common.fontSize.b[0]};
  color: ${Common.colors.white[0]};
  font-weight: bold;
  &:hover:enabled {
    background-color: ${Common.colors.red[1]};
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  }

  &:disabled {
    background-color: ${theme.bg.disabledBtn};
    color: ${theme.text.disabledBtn};
    cursor: default;
  }
`;

const LoadingButton = ({ theme }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px;
  margin-top: 16px;
  background-color: ${theme.bg.disabledBtn};
  cursor: default;
`;

const ReferenceButton = css`
  padding: 4px 6px;
  margin-left: 4px;
  border-radius: 4px;
  background-color: ${Common.colors.gray[2]};
  box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
  vertical-align: middle;
  transition: 0.5s;
  &:hover {
    background-color: ${Common.colors.gray[4]};
  }
`;

const DownloadButton = css`
  width: 200px;
  height: 60px;
  background-color: ${Common.colors.green[0]};
  color: ${Common.colors.white[0]};
  line-height: 60px;
  font-size: ${Common.fontSize.h[1]};
  transition: 8 00ms ease all;
  outline: none;
  text-align: center;

  &:hover {
    background: #fff;
    color: ${Common.colors.green[0]};
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: ${Common.colors.green[0]};
    transition: 400ms ease all;
  }
  &:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  &:hover:before,
  &:hover:after {
    width: 100%;
    transition: 800ms ease all;
  }
`;

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
      case "reference":
        return ReferenceButton;
      case "download":
        return DownloadButton;
      case "loading":
        return LoadingButton;
      default:
        break;
    }
  }}

  ${({ hover }) => hover && Hover};
`;
