import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editableStandardCategoryItems,
  standardTableColumns,
} from "../../../../assets/data";
import { Category, Spinner, Table } from "../../../../components";
import { SubmitForm } from "../index";
import { formula } from "../../../../assets/dummyData";
import * as S from "./EditableStandardTable.style";

const EditableStandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(true);
  const [isDragDisabled, setIsDragDisabled] = useState(true);
  const [submitFormVisible, setSubmitFormVisible] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

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
    const { currentTarget } = e;
    const name = currentTarget.getAttribute("name");
    const { id, textContent } = currentTarget;

    setTableData((prev) =>
      prev.map((row, index) => {
        if (index === parseInt(id, 10)) {
          return {
            ...prev[id],
            [name]: name === "korean" ? textContent : parseInt(textContent, 10),
            value:
              name === "maxLevel"
                ? Math.round(
                    (prev[id].maxScore / parseInt(textContent, 10)) * 1000
                  ) / 1000
                : Math.round(
                    (parseInt(textContent, 10) / prev[id].maxLevel) * 1000
                  ) / 1000,
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

  const handleDeleteTableData = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      setTableData((prev) => prev.filter((row) => row.index !== index));
    }
  };

  const handleReorderTableData = (sourceIdx, destinationIdx) => {
    const nextTableData = [...tableData];
    const [reorderedRow] = nextTableData.splice(sourceIdx, 1);
    nextTableData.splice(destinationIdx, 0, reorderedRow);
    setTableData(nextTableData);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setDeleteMode(true);
    setIsDragDisabled(true);
    setTableData([...standardData[category]]);
  };

  const handleSaveTableData = () => {
    const standardDataObj = {};
    standardDataObj[category] = tableData;
    const nextStandardData = {
      ...standardData,
      ...standardDataObj,
    };
    setStandardData({ ...nextStandardData });
    setEditMode(false);
    /**
     * @Todo nextStandardData 서버에 저장
     */
  };

  useEffect(() => {
    if (
      !editableStandardCategoryItems.find((item) => item.value === category)
    ) {
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
    setEditMode(false);
  }, [category]);

  return (
    <S.Container>
      {submitFormVisible && (
        <SubmitForm
          nextIndex={tableData.length + 1}
          modalVisible={submitFormVisible}
          setModalVisible={setSubmitFormVisible}
          handleAddTableData={handleAddTableData}
        />
      )}
      <Category items={editableStandardCategoryItems} />
      {loading ? (
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
