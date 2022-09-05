import styled from "@emotion/styled";
import Common from "../../styles/common";
import { Text } from "../index";

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 170px;
  background-color: ${Common.colors.indigo[0]};

  ${Common.mediaQuery.tablet} {
    height: 200px;
  }
`;

export const LogoInsertContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;

  ${Common.mediaQuery.tablet} {
    height: 150px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 24px;
`;

export const Logo = styled(Text)`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.white[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.l[1]};
  }
`;

export const LogoBlock = styled.div`
  display: none;
  margin-left: 12px;
  padding: 10px;
  border-radius: 6px;
  background-color: ${Common.colors.red[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    display: block;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 24px;
`;
