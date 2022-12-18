import React, { useState, useEffect } from "react";
import {
  useClanMember,
  useClanMemberUpdate,
} from "../../../../hooks/queries/useClanMember";
import { managementTableColumns } from "../../../../assets/data";
import { Spinner, Table } from "../../../../components";
import * as S from "./Management.style";

const Management = () => {
  const { isLoading, data } = useClanMember({});
  const { mutate } = useClanMemberUpdate({});
  const [tableData, setTableData] = useState([]);
  const [updatedData, setUpdatedData] = useState(new Map());
  const openChatState = ["NOT_MEMBER", "MEMBER", "SUB_LEADER"];

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

    const updatedTagToSelected = new Map(updatedData);
    updatedTagToSelected.set(tag, nextState);
    setUpdatedData(updatedTagToSelected);
  };

  const handleSaveTableData = () => {
    if (!updatedData.size) {
      return;
    }
    const openChatStates = Array.from(updatedData, ([tag, openChatState]) => ({
      tag,
      openChatState,
    }));
    mutate(openChatStates);
  };

  const handleInitTable = () => {
    if (JSON.stringify(data) === JSON.stringify(tableData)) {
      return;
    }
    setTableData(data);
    alert("초기화 되었습니다.");
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
      <S.Actions>
        <S.StyledButton onClick={() => handleSaveTableData()}>
          저장
        </S.StyledButton>
        <S.StyledButton onClick={() => handleInitTable()}>
          초기화
        </S.StyledButton>
      </S.Actions>
    </S.Container>
  );
};

export default Management;
