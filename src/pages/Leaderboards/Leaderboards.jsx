import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useRankData } from "../../hooks/queries/useRankData";
import { Button, Category, Spinner, Table } from "../../components";
import {
  rankingCategoryItems,
  donationsRankingTableColumns,
  scoreRankingTableColumns,
} from "../../assets/data";
import * as S from "./Leaderboards.style";

const Leaderboards = () => {
  const tableRef = useRef(null);
  const { isLoading, data } = useRankData({});
  const navigate = useNavigate();
  const { category } = useParams();
  const columns = {
    donations: donationsRankingTableColumns,
    score: scoreRankingTableColumns,
  };
  const [tableColumns, setTableColumns] = useState(columns[category]);

  const handleClickExtractTableToXLSX = () => {
    const target = tableRef.current;

    if (!target) return;
    const wb = XLSX.utils.table_to_book(target, {
      sheet: "ranking list",
    });
    XLSX.writeFile(wb, "ranking_list.xlsx");
  };

  useEffect(() => {
    setTableColumns(columns[category]);
  }, [category]);

  useEffect(() => {
    if (!rankingCategoryItems.find((item) => item.value === category)) {
      navigate("/404-not-found");
    }
  }, []);

  return (
    <S.Section>
      <S.Container>
        <Category items={rankingCategoryItems} />
        {isLoading ? (
          <Spinner.Box />
        ) : (
          <Table
            ref={tableRef}
            columns={tableColumns}
            data={data[category]}
            sort={category === "donations"}
          />
        )}
        <S.ButtonWrapper>
          <Button version="download" onClick={handleClickExtractTableToXLSX}>
            Download XLSX
          </Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Section>
  );
};

export default Leaderboards;
