import React, { useState, useLayoutEffect } from "react";
import { managementTableColumns } from "../../../../assets/data";
import { Table } from "../../../../components";
import { accountInfo } from "../../../../assets/dummyData";
import * as S from "./Management.style";

const Management = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const handleChangeState = (tag, type, e) => {
    const { checked } = e.target;
    // eslint-disable-next-line no-unused-vars
    const nextTableData = tableData.map((row) =>
      tag === row.tag
        ? {
            ...row,
            [type]: checked,
          }
        : row
    );
    /**
     * @Todo nextTableData 서버에 저장
     */
  };

  useLayoutEffect(() => {
    const fetch = () => {
      const res = [...accountInfo];
      setTableData(res);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <S.Container>
      <Table
        version="management"
        columns={managementTableColumns}
        data={tableData}
        loading={loading}
        handleChangeState={handleChangeState}
      />
    </S.Container>
  );
};

export default Management;
