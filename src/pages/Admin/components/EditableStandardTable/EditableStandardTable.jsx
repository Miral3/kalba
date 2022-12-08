import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFormulaData,
  useFormulaDataUpdate,
} from "../../../../hooks/queries/useFormulaData";
import {
  editableStandardCategoryItems,
  standardTableColumns,
} from "../../../../assets/data";
import { Category, Spinner, Table } from "../../../../components";
import { SubmitForm } from "../index";
import * as S from "./EditableStandardTable.style";

const EditableStandardTable = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const type =
    category === "siegeMachines" ? "SIEGE_MACHINES" : category.toUpperCase();
  const { isLoading, data } = useFormulaData({ type });
  const { mutate } = useFormulaDataUpdate({});
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true);
  const [isDragDisabled, setIsDragDisabled] = useState(true);
  const [submitFormVisible, setSubmitFormVisible] = useState(false);

  const handleClickEditMode = (state) => {
    setEditMode(state);
  };

  const handleClickDeleteMode = (state) => {
    if (editMode && !state) {
      setIsDragDisabled(false);
    } else {
      setIsDragDisabled(true);
    }
    setDeleteMode(state);
  };

  const handleInputTableData = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    const { currentTarget } = e;
    const name = currentTarget.getAttribute("name");
    const { id, textContent } = currentTarget;

    let content = "";
    if (name === "korean") {
      content = textContent;
    } else if (!textContent) {
      content = 0;
    } else {
      content = parseInt(textContent, 10);
    }

    setTableData((prev) =>
      prev.map((row, index) => {
        if (index === parseInt(id, 10)) {
          return {
            ...prev[id],
            [name]: content,
            value:
              name === "maxLevel"
                ? Math.round((prev[id].maxScore / content) * 1000) / 1000
                : Math.round((content / prev[id].maxLevel) * 1000) / 1000,
          };
        }
        return row;
      })
    );

    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(currentTarget);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  };

  const handleAddTableData = (nextTableData) => {
    setTableData((prev) => {
      return [...prev, { ...nextTableData }];
    });
  };

  const handleDeleteTableData = (name) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      setTableData((prev) => prev.filter((row) => row.name !== name));
    }
  };

  const handleReorderTableData = (sourceIdx, destinationIdx) => {
    const nextTableData = [...tableData];
    const [reorderedRow] = nextTableData.splice(sourceIdx, 1);
    nextTableData.splice(destinationIdx, 0, reorderedRow);
    setTableData(nextTableData);
    setTableData((prev) =>
      prev.map((row, index) => {
        if (index === sourceIdx || index === destinationIdx) {
          return {
            ...prev[index],
            order: index,
          };
        }
        return row;
      })
    );
  };

  const setInit = () => {
    setEditMode(false);
    setDeleteMode(true);
    setIsDragDisabled(true);
  };

  const handleCancelEdit = () => {
    setInit();
    setTableData(data);
  };

  const handleSaveTableData = () => {
    const type =
      category === "siegeMachines" ? "SIEGE_MACHINES" : category.toUpperCase();

    mutate({ list: tableData, type });
    setInit();
  };

  useEffect(() => {
    if (
      !editableStandardCategoryItems.find((item) => item.value === category)
    ) {
      navigate("/404-not-found");
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTableData(data);
    }
  }, [isLoading, data]);

  return (
    <S.Container>
      {submitFormVisible && (
        <SubmitForm
          nextIndex={tableData.length}
          type={category}
          modalVisible={submitFormVisible}
          setModalVisible={setSubmitFormVisible}
          handleAddTableData={handleAddTableData}
        />
      )}
      <Category items={editableStandardCategoryItems} />
      {isLoading ? (
        <Spinner.Box />
      ) : (
        <Table
          columns={standardTableColumns}
          data={tableData}
          version="editableStandard"
          editMode={editMode}
          deleteMode={deleteMode}
          isDragDisabled={isDragDisabled}
          handleClickDeleteMode={handleClickDeleteMode}
          handleInputTableData={handleInputTableData}
          handleDeleteTableData={handleDeleteTableData}
          handleReorderTableData={handleReorderTableData}
        />
      )}
      <S.Actions>
        {!editMode && (
          <S.StyledButton onClick={() => handleClickEditMode(true)}>
            수정
          </S.StyledButton>
        )}
        {editMode && (
          <>
            <S.StyledButton
              dir="left"
              onClick={() => setSubmitFormVisible(true)}
            >
              추가
            </S.StyledButton>
            <S.StyledButton onClick={() => handleSaveTableData()}>
              저장
            </S.StyledButton>
            <S.StyledButton onClick={() => handleCancelEdit()}>
              취소
            </S.StyledButton>
          </>
        )}
      </S.Actions>
    </S.Container>
  );
};

export default EditableStandardTable;
