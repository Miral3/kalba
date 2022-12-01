import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 16px 0;
  border: 3px solid ${Common.colors.purple[0]};
  background: ${Common.gradient[0]};
  font-family: "supercell+NotoSansKR";
  text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -1px black;

  ${Common.mediaQuery.tabletS} {
    border-radius: 5px;
  }
`;

export const UserInfo = styled.div`
  padding: 0 8px;
`;

export const UserInfoContainer = styled.div`
  display: flex;
`;

export const LevelWrapper = styled.div`
  display: inline-grid;
  padding-right: 3px;
`;

export const LevelImg = styled.img`
  grid-row: 1/1;
  grid-column: 1/1;
  padding-top: 5px;
  width: 35px;

  ${Common.mediaQuery.tabletS} {
    width: 45px;
  }
`;

export const Level = styled(Text)`
  grid-row: 1/1;
  grid-column: 1/1;
  padding-top: 16px;
  text-align: center;
  font-size: ${Common.fontSize.c[1]};
  color: ${Common.colors.white[0]};

  ${Common.mediaQuery.tabletS} {
    padding-top: 18px;
    font-size: ${Common.fontSize.h[2]};
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const UserName = styled(Text)`
  color: ${Common.colors.white[0]};
  font-size: ${Common.fontSize.b[2]};

  ${Common.mediaQuery.tabletS} {
    font-size: ${Common.fontSize.h[2]};
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  align-self: center;
  gap: 6px;
`;

export const Tag = styled(Text)`
  line-height: 20px;
  font-size: 10px;
  color: ${Common.colors.gray[4]};
`;

export const Role = styled(Text)`
  font-family: "supercell+appLight";
  font-size: ${Common.fontSize.b[2]};
  color: ${Common.colors.white[0]};
`;

export const Labels = styled.ul`
  display: flex;
  gap: 8px;
  padding-top: 16px;
`;

export const Label = styled.li`
  width: 45px;
  height: 45px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const ClanInfo = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;
  padding: 0 24px;
  border-left: 2px solid #8f94ad;
  border-right: 2px solid #8f94ad;

  ${Common.mediaQuery.tablet} {
    display: flex;
  }
`;

export const ClanName = styled(Text)`
  font-family: "supercell+appLight";
  color: ${Common.colors.white[0]};
`;

export const ClanBadge = styled.img`
  width: 150px;
`;

export const UserScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 8px;
`;

export const LeagueScore = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const LeagueBadge = styled.img`
  position: absolute;
  top: -5px;
  left: -13px;
  width: 30px;
  ${Common.mediaQuery.mobileS} {
    top: -12px;
    left: -40px;
    width: 80px;
  }
`;

export const CurrentLeague = styled.div`
  width: 115px;
  padding-bottom: 6px;
  text-align: center;

  ${Common.mediaQuery.mobileS} {
    width: 160px;
  }
`;

export const LeagueNameBlock = styled.div`
  padding: 3px 0;
  background: ${Common.gradient[2]};
`;

export const LeagueName = styled(Text)`
  font-family: "supercell+appLight";
  color: ${Common.colors.white[0]};
`;

export const LeagueScoreBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  background: ${Common.gradient[3]};
`;

export const Trophy = styled.img`
  width: ${({ small }) => (small ? "17px" : "30px")};
`;

export const Score = styled(Text)`
  font-size: ${({ small }) =>
    small ? Common.fontSize.c[1] : Common.fontSize.h[2]};
  color: ${Common.colors.white[0]};
`;

export const Type = styled(Text)`
  align-self: flex-start;
  padding-top: 8px;
  padding-bottom: 5px;
  font-family: "supercell+appLight";
  color: ${Common.colors.white[0]};
  font-size: ${Common.fontSize.c[0]};
`;

export const ScoreBlock = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 110px;
  height: 22px;
  margin-left: 16px;
  border-radius: 6px;
  background-color: ${Common.colors.purple[2]};
`;

export const Image = styled.img`
  position: absolute;
  left: -10px;
  width: 30px;
`;
