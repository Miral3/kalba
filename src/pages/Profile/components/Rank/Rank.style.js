import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  border: 3px solid ${Common.colors.purple[1]};
  background: ${Common.gradient[1]};
  font-family: "supercell+appLight";
  text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -1px black;

  span {
    color: ${Common.colors.white[0]};
  }

  ${Common.mediaQuery.tabletS} {
    border-radius: 5px;
  }
`;

export const Header = styled(Text)`
  font-size: ${Common.fontSize.h[1]};

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.h[0]};
  }
`;

export const RankContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;

  ${Common.mediaQuery.tablet} {
    padding: 0;
  }
`;

export const RankWrapper = styled.div`
  display: inline-grid;
  align-items: center;
`;

export const Badge = styled.img`
  grid-row: 1/1;
  grid-column: 1/1;
  width: 60px;

  ${Common.mediaQuery.mobile} {
    width: 80px;
  }
  ${Common.mediaQuery.tabletS} {
    width: 90px;
  }
`;

export const Rank = styled(Text)`
  grid-row: 1/1;
  grid-column: 1/1;
  font-family: "supercell+NotoSansKR";
  font-size: ${Common.fontSize.h[2]};
  text-align: center;

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.b[0]};
  }
  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.h[1]};
  }
`;

export const Type = styled(Text)`
  font-size: ${Common.fontSize.b[2]};

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.b[1]};
  }
  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.b[0]};
  }
`;

export const ScoreBlock = styled.div`
  position: relative;
  width: 90px;
  margin-top: 6px;
  border-radius: 3px;
  background-color: ${Common.colors.purple[3]};
  text-align: center;

  ${Common.mediaQuery.mobile} {
    width: 100px;
  }
  ${Common.mediaQuery.tabletS} {
    width: 120px;
  }
`;

export const Trophy = styled.img`
  position: absolute;
  top: -3px;
  left: -8px;
  width: 28px;

  ${Common.mediaQuery.mobile} {
    top: -5px;
    left: -10px;
    width: 34px;
  }
  ${Common.mediaQuery.tabletS} {
    top: -7px;
    left: -10px;
    width: 38px;
  }
`;

export const Score = styled.div`
  padding: 5px;
  font-family: "supercell+NotoSansKR";
  font-size: ${Common.fontSize.b[2]};
  color: ${Common.colors.white[0]};
  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.b[1]};
  }
`;
