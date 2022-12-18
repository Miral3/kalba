import React from "react";
import { useRankData, useRankUpdate } from "../../hooks/queries/useRankData";
import { Spinner } from "../../components";
import Top10Table from "./components/Top10Table/Top10Table";
import {
  donationsRankingTableColumns,
  scoreRankingTableColumns,
} from "../../assets/data";
import * as S from "./Main.style";

const Main = () => {
  const { isLoading, data } = useRankData({});
  const { mutate } = useRankUpdate({});

  const handleUpdateRankData = () => {
    mutate();
  };

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
              data={data.top10.donations}
              handleUpdateRankData={handleUpdateRankData}
              title="지원 TOP 10"
            />
            <Top10Table
              columns={scoreRankingTableColumns}
              data={data.top10.score}
              handleUpdateRankData={handleUpdateRankData}
              title="공격력 TOP 10"
            />
          </>
        )}
      </S.Container>
    </S.Section>
  );
};

export default Main;
