import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  editableStandardCategoryItems,
  standardTableColumns,
} from "../../../../assets/data";
import { Category, Table } from "../../../../components";
import { SubmitForm } from "../index";
import { formula } from "../../../../assets/dummyData";
import * as S from "./EditableStandardTable.style";

const EditableStandardTable = () => {
  const [loading, setLoading] = useState(true);
  const [standardData, setStandardData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [submitFormVisible, setSubmitFormVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { category } = useParams();

  const handleClickEditMode = (state) => {
    setEditMode(state);
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

  const handleCancelEdit = () => {
    setEditMode(false);
    setTableData([...standardData[category]]);
  };

  const handleSaveTableData = () => {
    const standardDataObj = {};
    standardDataObj[category] = tableData;
    setStandardData((prev) => ({
      ...prev,
      ...standardDataObj,
    }));
    setEditMode(false);
    setIsInitialized(true);
  };

  useEffect(() => {
    const res = { ...formula };
    setStandardData(res);
    setTableData(res[category]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading && tableData.length === 0) return;
    setTableData(standardData[category]);
    setEditMode(false);
  }, [category]);

  useEffect(() => {
    if (!isInitialized) return;
    const fetchData = async () => {
      /**
       * @Todo tableData가 변할때 마다 formula 업데이트
       */
    };
    fetchData();
  }, [tableData]);

  if (loading) {
    return;
  }

  return (
    <S.Main>
      <S.Section>
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
          <Table
            columns={standardTableColumns}
            data={tableData}
            version="editableStandard"
            editMode={editMode}
            handleInputTableData={handleInputTableData}
            handleDeleteTableData={handleDeleteTableData}
          />
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
      </S.Section>
    </S.Main>
  );
};

export default EditableStandardTable;
