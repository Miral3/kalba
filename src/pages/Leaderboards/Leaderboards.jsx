import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as xlsx from "xlsx";
import { useRankData } from "../../hooks/queries/useRankData";
import { Button, Category, Spinner, Table } from "../../components";
import { translateRole } from "../../utils/translate";
import {
  rankingCategoryItems,
  donationsRankingTableColumns,
  scoreRankingTableColumns,
} from "../../assets/data";
import * as S from "./Leaderboards.style";

const Leaderboards = () => {
  const { isLoading, data } = useRankData({});
  const navigate = useNavigate();
  const { category } = useParams();
  const columns = {
    donations: donationsRankingTableColumns,
    score: scoreRankingTableColumns,
  };

  const handleClickExtractTableToXLSX = () => {
    if (!data || !category) {
      return;
    }
    const translateData =
      category === "donations"
        ? data[category].map((value) => {
            return {
              ...value,
              role: translateRole(value.role),
              expectedRole: translateRole(value.expectedRole),
            };
          })
        : data[category];
    const wb = xlsx.utils.book_new();
    const header = columns[category].map((data) => data.accessor);
    const ws = xlsx.utils.json_to_sheet(translateData, { header });
    const hidden =
      category === "donations" ? [5, 6, 7, 8, 9, 10] : [5, 6, 7, 8, 9];
    const cols = columns[category].map((data) => data.header);

    ws["!cols"] = [];

    hidden.forEach((idx) => {
      ws["!cols"][idx] = { hidden: true };
    });

    cols.forEach((x, idx) => {
      const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
      ws[cellAdd].v = x;
    });

    xlsx.utils.book_append_sheet(wb, ws, category);
    xlsx.writeFile(wb, "ranking_list.xlsx");
  };

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
            columns={columns[category]}
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
