import React, { useEffect } from "react";
import * as xlsx from "xlsx";
import { useNavigate, useParams } from "react-router-dom";
import { useFormulaData } from "../../hooks/queries/useFormulaData";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Spinner, Table, Button } from "../../components";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { isLoading, data } = useFormulaData({});

  const handleClickExtractJSONToXLSX = () => {
    const wb = xlsx.utils.book_new();
    Object.keys(data).forEach((key, idx) => {
      const ws = xlsx.utils.json_to_sheet(data[key]);
      const hidden = [0, 5];
      const cols = ["종류", "비례 점수", "최대 점수", "최대 레벨"];

      ws["!cols"] = [];

      hidden.forEach((idx) => {
        ws["!cols"][idx] = { hidden: true };
      });

      cols.forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx + 1, r: 0 });
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

  return (
    <S.Section>
      <S.Container>
        <Category items={standardCategoryItems} />
        {isLoading ? (
          <Spinner.Box />
        ) : (
          <Table
            columns={standardTableColumns}
            data={data[category]}
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
