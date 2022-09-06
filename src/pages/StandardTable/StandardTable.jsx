import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Table } from "../../components";
import { formula } from "../../assets/dummyData";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const res = { ...formula };
    setStandardData(res);
    setTableData(res.heroes);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (tableData.length === 0) return;

    const { pathname } = location;
    const name = pathname.split("/")[2];
    setTableData(standardData[name]);
  }, [location]);

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
