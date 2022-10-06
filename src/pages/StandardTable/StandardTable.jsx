import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Table } from "../../components";
import { formula } from "../../assets/dummyData";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const res = { ...formula };
    setStandardData(res);
    setTableData(res.heroes);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (tableData.length === 0) return;
    setTableData(standardData[category]);
  }, [category]);

  if (loading) {
    return;
  }
  return (
    <S.Main>
      <S.Section>
        <S.Container>
          <Category items={standardCategoryItems} />
          <Table
            columns={standardTableColumns}
            data={tableData}
            version="standard"
          />
        </S.Container>
      </S.Section>
    </S.Main>
  );
};

export default StandardTable;
