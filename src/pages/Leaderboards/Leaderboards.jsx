import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { expectedRole } from "../../utils/expectedRole";
import { Button, Category, Spinner, Table } from "../../components";
import {
  rankingCategoryItems,
  donationsRankingTableColumns,
  attackPowerRankingTableColumns,
} from "../../assets/data";
import { userInfo } from "../../assets/dummyData";
import * as S from "./Leaderboards.style";

const Leaderboards = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();
  const count = {
    cutLine: 13,
    coLeaderCnt: 5,
    adminCnt: 8,
  };

  const handleClickExtractTableToXLSX = () => {
    const target = tableRef.current;

    if (!target) return;
    const wb = XLSX.utils.table_to_book(target, {
      sheet: "ranking list",
    });
    XLSX.writeFile(wb, "ranking_list.xlsx");
  };

  useEffect(() => {
    if (!rankingCategoryItems.find((item) => item.value === category)) {
      navigate("/404-not-found");
    }
  }, []);

  useLayoutEffect(() => {
    const fetch = async () => {
      const res = [...userInfo].map((val, idx) => ({
        ...val,
        expectedRole: expectedRole(
          val.role,
          idx,
          val.donations,
          val.tag,
          count
        ),
      }));
      if (category === "donations") {
        setTableColumns(donationsRankingTableColumns);
        res.sort((a, b) => a.donationRank - b.donationRank);
      } else if (category === "score") {
        setTableColumns(attackPowerRankingTableColumns);
        res.sort((a, b) => a.yonghaScoreRank - b.yonghaScoreRank);
      }

      setTableData(res);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (loading) return;

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

  return (
    <S.Section>
      <S.Container>
        <Category items={rankingCategoryItems} />
        {loading ? (
          <Spinner.Box />
        ) : (
          <Table ref={tableRef} columns={tableColumns} data={tableData} />
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
