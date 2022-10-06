import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  rankingCategoryItems,
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import { Category, Table } from "../../components";
import { userInfo } from "../../assets/dummyData";
import * as S from "./Leaderboards.style";

const Leaderboards = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const res = [...userInfo];
    setTableData(res);
    setTableColumns(donationsRankingTableColumns);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (tableData.length === 0) return;

    if (category === "donations") {
      const nextTableData = tableData.sort(
        (a, b) => a.donationRank - b.donationRank
      );
      setTableData(nextTableData);
      setTableColumns(donationsRankingTableColumns);
    } else if (category === "score") {
      const nextTableData = tableData.sort(
        (a, b) => a.yonghaScoreRank - b.yonghaScoreRank
      );
      setTableData(nextTableData);
      setTableColumns(attackPowerRankingTableColumns);
    }
  }, [category]);

  if (loading) {
    return;
  }
  return (
    <S.Main>
      <S.Section>
        <S.Container>
          <Category items={rankingCategoryItems} />
          <Table columns={tableColumns} data={tableData} />
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

export default Leaderboards;
