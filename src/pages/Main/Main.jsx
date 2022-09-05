import React from "react";
import Top10Table from "./components/Top10Table/Top10Table";
import {
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import { userInfo } from "../../assets/dummyData";
import * as S from "./Main.style";

const Main = () => {
  const top10DonationRank = [...userInfo].slice(0, 10);
  const top10PowerRank = [...userInfo]
    .sort((a, b) => a.yonghaScoreRank - b.yonghaScoreRank)
    .slice(0, 10);
  return (
    <S.Main>
      <S.Section>
        <S.Container>
          <Top10Table
            columns={donationsRankingTableColumns}
            data={top10DonationRank}
            title="지원 TOP 10"
            timer="승강전: 22일 5시간 후"
          />
          <Top10Table
            columns={attackPowerRankingTableColumns}
            data={top10PowerRank}
            title="공격력 TOP 10"
            timer="리그전: 22일 5시간 후"
          />
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

export default Main;
