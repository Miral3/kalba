import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { standardCategoryItems, standardTableColumns } from "../../assets/data";
import { Category, Table } from "../../components";
import { formula } from "../../assets/dummyData";
import * as S from "./StandardTable.style";

const StandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

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
        <Table
          columns={standardTableColumns}
          data={tableData}
          version="standard"
          loading={loading}
        />
      </S.Container>
    </S.Section>
  );
};

export default StandardTable;
