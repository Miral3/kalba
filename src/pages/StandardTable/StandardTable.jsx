import React, { useState, useEffect, useLayoutEffect } from "react";
import * as xlsx from "xlsx";
import { useNavigate, useParams } from "react-router-dom";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Spinner, Table, Button } from "../../components";
import { formula } from "../../assets/dummyData";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  const handleClickExtractJSONToXLSX = () => {
    const wb = xlsx.utils.book_new();
    Object.keys(standardData).forEach((key, idx) => {
      const ws = xlsx.utils.json_to_sheet(standardData[key]);

      ws["!cols"] = [];
      ws["!cols"][0] = { hidden: true };
      ws["!cols"][1] = { hidden: true };

      ["종류", "최대 점수", "최대 레벨", "비례 점수"].forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx + 2, r: 0 });
        ws[cellAdd].v = x;
      });

      xlsx.utils.book_append_sheet(wb, ws, standardCategoryItems[idx].name);
    });
    xlsx.writeFile(wb, `formula.xlsx`);
  };

  useEffect(() => {
    if (!standardCategoryItems.find((item) => item.value === category)) {
      navigate("/404-not-found");
    }
  }, []);

  useLayoutEffect(() => {
    const fetch = async () => {
      const res = { ...formula };
      setStandardData(res);
      setTableData(res[category]);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (loading) return;
    setTableData(standardData[category]);
  }, [category]);

  return (
    <S.Section>
      <S.Container>
        <Category items={standardCategoryItems} />
        {loading ? (
          <Spinner.Box />
        ) : (
          <Table
            columns={standardTableColumns}
            data={tableData}
            version="standard"
          />
        )}
        <S.ButtonWrapper>
          <Button version="download" onClick={handleClickExtractJSONToXLSX}>
            Download XLSX
          </Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Section>
  );
};

export default StandardTable;
