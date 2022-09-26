import styled from "@emotion/styled";
import Common from "../../../../styles/common";

export const Card = styled.div`
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  background-color: ${Common.colors.white[0]};
  margin: 10px 8px 16px 8px;
  ${Common.mediaQuery.tabletS} {
    width: 500px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.red[0]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 80px);
  margin-top: 30px;
  overflow: auto;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;

  ${Common.mediaQuery.tabletS} {
    width: 500px;
  }
`;
