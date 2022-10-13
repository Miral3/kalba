import styled from "@emotion/styled";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border: 3px solid ${Common.colors.purple[0]};
  background: ${Common.gradient[0]};
  font-family: "supercell+appLight";
  text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -1px black;

  span {
    color: ${Common.colors.white[0]};
  }

  ${Common.mediaQuery.tabletS} {
    border-radius: 5px;
  }
  ${Common.mediaQuery.tablet} {
    display: grid;
    grid-template-areas:
      "홀 병력"
      "영웅 마법"
      "펫 마법"
      "펫 시즈머신";
    justify-content: center;
    align-items: stretch;
    justify-items: center;
    grid-column-gap: 8px;
  }
`;

export const TownHall = styled.img`
  grid-area: 홀;
  width: 150px;
  padding: 24px 0;
  ${Common.mediaQuery.tablet} {
    width: 140px;
    height: 158px;
  }
`;

export const UnitContainer = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  width: 100%;
  padding: 8px;
  margin: 3px 0;
  border-radius: 5px;
  background-color: ${Common.colors.gray[5]};

  ${Common.mediaQuery.tablet} {
    width: auto;
    padding: 8px 5px;
  }
`;

export const Type = styled(Text)``;

export const UnitList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 44px));
  justify-content: start;
  gap: 8px;
  margin-top: 8px;

  ${Common.mediaQuery.tabletS} {
    grid-template-columns: repeat(9, 44px);
  }
  ${Common.mediaQuery.tablet} {
    grid-template-columns: ${({ num }) => `repeat(${num}, 44px)`};
    gap: 3px;
    padding-right: 16px;
  }
`;

export const UnitItem = styled.li`
  position: relative;
  width: 40px;
  height: 40px;
  border: 2px solid ${Common.colors.purple[4]};
  border-radius: 5px;
`;

export const Unit = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${Common.colors.gray[6]};
  -webkit-filter: ${({ isExist }) =>
    isExist ? "grayscale(0%)" : "grayscale(100%)"};
  filter: ${({ isExist }) => (isExist ? "none" : "gray")};
`;

export const Level = styled(Text)`
  position: absolute;
  left: 1px;
  bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.5px;
  height: 13px;
  border-radius: 3px;
  border: 1px solid ${Common.colors.white[0]};
  background-color: ${({ isMaxLevel }) =>
    isMaxLevel ? Common.colors.yellow[0] : Common.colors.black[0]};
  font-size: 10px;
  font-weight: bold;
  transform: scale(0.85);
  transform-origin: left;

  ${Common.mediaQuery.mobile} {
    transform: scale(1);
  }
`;
