import React, { useEffect } from "react";
import * as xlsx from "xlsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFormulaData,
  useFormulaDataToObject,
} from "../../hooks/queries/useFormulaData";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Spinner, Table, Button } from "../../components";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const type =
    category === "siegeMachines" ? "SIEGE_MACHINES" : category.toUpperCase();
  const { isLoading, data } = useFormulaData({ type });
  const { isObjDataLoading, data: objData } = useFormulaDataToObject();

  const handleClickExtractJSONToXLSX = () => {
    if (isObjDataLoading) {
      return;
    }
    const wb = xlsx.utils.book_new();
    const header = ["korean", "maxScore", "maxLevel", "value"];
    Object.keys(objData).forEach((key, idx) => {
      const ws = xlsx.utils.json_to_sheet(objData[key], { header });
      const hidden = [4, 5, 6];
      const cols = ["종류", "최대 점수", "최대 레벨", "비례 점수"];

      ws["!cols"] = [];

      hidden.forEach((idx) => {
        ws["!cols"][idx] = { hidden: true };
      });

      cols.forEach((x, idx) => {
        const cellAdd = xlsx.utils.encode_cell({ c: idx, r: 0 });
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
            data={data}
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
