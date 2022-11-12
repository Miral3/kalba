import React, { useState, useEffect } from "react";
import { useClanMember } from "../../../../hooks/queries/useClanMember";
import { managementTableColumns } from "../../../../assets/data";
import { Spinner, Table } from "../../../../components";
import * as S from "./Management.style";

const Management = () => {
  const { isLoading, data } = useClanMember({});
  const [tableData, setTableData] = useState([]);
  const openChatState = ["NOT_MEMBER", "MEMBER", "SUB_LEADER"];
  // const openChatState = ["X", "O", "부방장"];

  const handleChangeOpenChatState = (state, tag) => {
    if (state === "LEADER") {
      return;
    }
    const idx = openChatState.findIndex((val) => val === state);
    const nextState = openChatState[(idx + 1) % openChatState.length];
    const nextTableData = tableData.map((row) =>
      tag === row.tag
        ? {
            ...row,
            openChatStateType: nextState,
          }
        : row
    );
    setTableData(nextTableData);
    /**
     * @Todo nextTableData 서버에 저장
     */
  };

  useEffect(() => {
    if (!isLoading) {
      setTableData(data);
    }
  }, [isLoading, data]);

  return (
    <S.Container>
      {isLoading ? (
        <Spinner.Box />
      ) : (
        <Table
          version="management"
          columns={managementTableColumns}
          data={tableData}
          handleChangeOpenChatState={handleChangeOpenChatState}
        />
      )}
    </S.Container>
  );
};

export default Management;
