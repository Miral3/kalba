import React from "react";
import { useRankData } from "../../hooks/queries/useRankData";
import { Spinner } from "../../components";
import Top10Table from "./components/Top10Table/Top10Table";
import {
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import * as S from "./Main.style";

const Main = () => {
  const { isLoading, data } = useRankData({});

  return (
    <S.Section>
      <S.Container>
        {isLoading ? (
          <>
            <Spinner.Box />
            <Spinner.Box />
          </>
        ) : (
          <>
            <Top10Table
              columns={donationsRankingTableColumns}
              data={data.top10DonationRank}
              title="지원 TOP 10"
              timer="승강전: 22일 5시간 후"
            />
            <Top10Table
              columns={attackPowerRankingTableColumns}
              data={data.top10PowerRank}
              title="공격력 TOP 10"
              timer="리그전: 22일 5시간 후"
            />
          </>
        )}
      </S.Container>
    </S.Section>
  );
};

export default Main;
