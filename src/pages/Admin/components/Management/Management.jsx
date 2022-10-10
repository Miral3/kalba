/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { managementTableColumns } from "../../../../assets/data";
import { Table } from "../../../../components";
import { accountInfo } from "../../../../assets/dummyData";
import * as S from "./Management.style";

const Management = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleChangeState = (tag, type, e) => {
    const { checked } = e.target;
    setTableData(
      tableData.map((row) =>
        tag === row.tag
          ? {
              ...row,
              [type]: checked,
            }
          : row
      )
    );
    setIsInitialized(true);
  };

  useEffect(() => {
    const res = [...accountInfo];
    setTableData(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    const fetchData = async () => {
      /**
       * @Todo tableData가 변할때 마다 account info 업데이트
       */
    };
    fetchData();
  }, [tableData]);

  if (loading) {
    return;
  }

  return (
    <S.Container>
      <Table
        version="management"
        columns={managementTableColumns}
        data={tableData}
        handleChangeState={handleChangeState}
      />
    </S.Container>
  );
};

export default Management;
