import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";

import Table from "./Table";
import Modal from "../Modal";
import EditBtn from './EditBtn';
import { deepCopy } from "../../tools/tools";

import styled from 'styled-components';

const Container = styled.div`
`;

const TrashCan = ({ handleRemove, row, className }) => (
  <span
    className={className}
    onClick={() => handleRemove(row.index)}
    role="img"
    aria-label="delete"
  >
    🗑️
  </span>
);

const StyledTrashCan = styled(TrashCan)`
  position: absolute;
  right: -50px;
  cursor: pointer;
  padding: 15px;
  display: none;
  tr:hover & {
    display: ${({ isSomethingDragging }) =>
    isSomethingDragging ? "none" : "inline"};
  }
`;

const UpDownArrow = (props) => (
  <span
    {...props.dragHandleProps}
    className={props.className}
    aria-label="move"
    role="img"
  >
    ↕️
  </span>
);

const StyledUpDownArrow = styled(UpDownArrow)`
  position: absolute;
  left: -50px;
  padding: 15px;
  display: none;
  tr:hover & {
    display: ${({ isSomethingDragging }) =>
    isSomethingDragging ? "none" : "inline"};
  }
`;

const Description = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `;
const Value = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `

const StandardList = (props) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOn, setModalOn] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const category = props.category === "troops" ? "units" : props.category;
  const [staticData, setStaticData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          '/coc/clan/formula', {
          headers: {
            "Content-Type": "application/json",
          }
        }).then(res => {
          const originData = res.data[category];
          setData(originData);
          setStaticData(deepCopy(originData));
          setNextId(originData.length);
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [category]);

  const columns = useMemo(() => {
    const EditableTextCell = (props) => {
      const { column, row, cell } = props;
      const value = cell.value;
      const rowIndex = row.index;
      const columnId = column.id;

      const onChange = (e) => {
        const { value } = e.target;
        setData((prev) =>
          prev.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...prev[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      };
      return (
        <>
          {
            editMode
              ? <input value={value} onChange={onChange} className={columnId} />
              : <>{value}</>
          }
        </>
      );
    };

    const DescriptionCell = (props) => {
      return (
        <Description>
          {editMode && <StyledUpDownArrow {...props} />}
          <EditableTextCell {...props} />
        </Description>
      )
    };

    const valueCell = (props) => {
      return (
        <Value>
          {editMode && <StyledTrashCan {...props} />}
          {props.row.values.value}
        </Value>
      );
    };

    return [
      {
        accessor: "korean",
        Header: "종류",
        type: "korean",
        Cell: DescriptionCell,
      },
      {
        accessor: "maxScore",
        Header: "최대 점수",
        type: "maxScore",
        Cell: EditableTextCell,
      },
      {
        accessor: "maxLevel",
        Header: "최대 레벨",
        type: "maxLevel",
        Cell: EditableTextCell,
      },
      {
        accessor: (row) => Math.round(row.maxScore / row.maxLevel * 1000) / 1000,
        Header: "비례 점수",
        type: "value",
        id: "value",
        Cell: valueCell,
      }
    ];
  }, [editMode]);

  const addRow = () => {
    handleModal();
  }

  const handleSubmit = async (form) => {
    const calculation = Math.round(form.maxScore / form.maxLevel * 1000) / 1000;
    setData(prev => prev.concat({
      english: form.englishName,
      index: nextId,
      korean: form.korean,
      maxScore: form.maxScore,
      maxLevel: form.maxLevel,
      value: calculation,
    }))
    setNextId(nextId + 1);
    handleModal();
    // await handleSave();
  }

  const handleModal = () => {
    setModalOn(!modalOn);
  }

  const handleSave = async () => {
    await axios.put(
      '/coc/clan/formula',
      getFormulaDataObject(),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.status === 400) {
          alert("예상하지 못한 에러가 발생하여 서버에 저장하지 못하였습니다. 다시 한번 시도해주세요.");
        } else {
          alert("저장에 성공하였습니다. 지금 즉시 적용된 점수를 확인하시려면 갱신 버튼을 눌러주세요.");
        }
      }).catch(e => {
        alert("예상하지 못한 에러가 발생하여 서버에 저장하지 못하였습니다. 다시 한번 시도해주세요.");
      });
  }

  const getFormulaDataObject = () => {
    let obj = {};
    obj[category] = data;
    return obj;
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleEditCancel = () => {
    setData(deepCopy(staticData));
    handleEditMode();
  }

  const handleRemove = (rowIndex) => {
    setData((prev) => prev.filter((row, index) => index !== rowIndex));
  };

  const handleReorderData = (startIndex, endIndex) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setData(newData);
  }

  if (loading) {
    return <div></div>
  }

  return (
    <Container>
      {modalOn && <Modal handleModal={handleModal} handleSubmit={handleSubmit} />}
      {data && <Table
        columns={columns}
        data={data}
        handleRemove={handleRemove}
        handleReorderData={handleReorderData}
        editMode={editMode}
      />}
      {props.admin && <EditBtn
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleSave={handleSave}
        addRow={addRow}
        handleEditCancel={handleEditCancel}
      />}
    </Container>
  )
};

export default StandardList;
