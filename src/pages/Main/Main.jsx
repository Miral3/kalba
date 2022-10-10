import React, { useState, useEffect } from "react";
import Top10Table from "./components/Top10Table/Top10Table";
import {
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import { userInfo } from "../../assets/dummyData";
import * as S from "./Main.style";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [top10DonationRank, setTop10DonationRank] = useState([]);
  const [top10PowerRank, setTop10PowerRank] = useState([]);

  useEffect(() => {
    const res = [...userInfo];
    setTop10DonationRank([...res].slice(0, 10));
    setTop10PowerRank(
      [...res]
        .sort((a, b) => a.yonghaScoreRank - b.yonghaScoreRank)
        .slice(0, 10)
    );
    setLoading(false);
  }, []);

  if (loading) {
    return;
  }

  return (
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
  );
};

export default Main;
