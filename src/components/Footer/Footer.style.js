import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";
import { Text } from "../index";

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: ${({ theme }) => theme.bg.footer};
`;

export const Logo = styled(NavLink)`
  font-size: ${Common.fontSize.h[1]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${({ theme }) => theme.text.text};
`;

export const Content = styled.div`
  padding-top: 6px;
`;

export const About = styled(NavLink)`
  padding-right: 6px;
  font-size: ${Common.fontSize.b[2]};
  font-weight: 600;
  color: ${Common.colors.blue[0]};
`;

export const Copyright = styled(Text)`
  font-size: ${Common.fontSize.c[1]};
  color: ${Common.colors.gray[2]};
`;
