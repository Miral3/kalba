import styled from "@emotion/styled";
import Common from "../../styles/common";
import { Text } from "../../components";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 80px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled(Text)`
  padding: 40px 0;
  font-family: "supercell+NotoSansKR";
  font-size: ${Common.fontSize.h[0]};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.t[0]};
  }
`;

export const NotFound = styled.img`
  width: 286px;

  ${Common.mediaQuery.tabletS} {
    width: 326px;
  }
`;

export const Description = styled(Text)`
  padding-top: 24px;
  font-size: ${Common.fontSize.h[2]};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.h[1]};
  }
`;
