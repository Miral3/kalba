import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";

import Table from "./Table";
import Modal from "../Modal";
import EditBtn from './EditBtn';

import styled from 'styled-components';

const Container = styled.div`
`;

const TrashCan = ({ removeRow, row, className }) => (
  <span
    className={className}
    onClick={() => removeRow(row.index)}
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

const Test = (props) => {
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
          setData(dataPreprocess(res.data));
          setStaticData(res.data);
          setNextId(res.data[category].length);
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [category]);

  const EditableTextCell = (props) => {
    const { column, row, cell } = props;
    const value = cell.value;
    const rowIndex = row.index;
    const type = column.type;

    const onChange = (e) => {
      const { id, className, value } = e.target;
      data[category][id][1][className] = value;
      if (className === "maxScore" || className === "maxLevel") {
        data[category][id][1].value = Math.round(data[category][id][1].maxScore / data[category][id][1].maxLevel * 1000) / 1000;
      }
      setData((prevState) => ({ ...prevState, }));
    };

    return (
      <>
        {
          editMode
            ? <input value={value} onChange={onChange} id={rowIndex} className={type} />
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
  }


  const valueCell = (props) => {
    return (
      <Value>
        {editMode && <StyledTrashCan {...props} />}
        {props.row.values.value}
      </Value>
    );
  };

  const columns = useMemo(
    () => [
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
        accessor: "value",
        Header: "비례 점수",
        type: "value",
        Cell: valueCell,
      },
    ], [editMode]);

  const dataPreprocess = (data) => {
    const classNameArr = ["heroes", "pets", "units", "spells", "siegeMachines"];
    for (let i = 0; i < classNameArr.length; i++) {
      data[classNameArr[i]] = Object.entries(data[classNameArr[i]]);
      data[classNameArr[i]].sort((a, b) => {
        return a[1].index - b[1].index;
      });
    }
    return data;
  }

  const set = () => {
    return data[category].map((el) => ({
      englishName: el[0],
      index: el[1].index,
      korean: el[1].korean,
      maxScore: el[1].maxScore,
      maxLevel: el[1].maxLevel,
      value: el[1].value,
    }));
  }

  const addRow = () => {
    setModalOn(true);
  }

  const handleSave = async () => {
    await axios.put(
      '/coc/clan/formula',
      {
        name: category,
        formulaDataObject: getFormulaDataObject()
      },
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
    for (let i = 0; i < data[category].length; i++) {
      obj[data[category][i][0]] = data[category][i][1];
    }
    return obj;
  }

  const handleCancel = () => {
    setModalOn(false);
  }

  const handleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleSubmit = async (form) => {
    const calculation = Math.round(form.maxScore / form.maxLevel * 1000) / 1000;
    data[category].push(
      [form.englishName,
      {
        index: nextId,
        korean: form.korean,
        maxScore: form.maxScore,
        maxLevel: form.maxLevel,
        value: calculation,
      }]);
    setNextId(nextId + 1);
    setData((prevState) => ({ ...prevState, }));
    setModalOn(false);
    // await handleSave();
  }

  const editCancel = () => {
    setData(staticData);
  }

  const removeRow = (rowIndex) => {
    data[category].splice(rowIndex, 1);
    setData((prevState) => ({ ...prevState, }));
  };

  const reorderData = (startIndex, endIndex) => {
    const newData = data[category];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setData((prevState) => ({ ...prevState, }));
  }

  if (loading) {
    return <div></div>
  }

  return (
    <Container>
      {modalOn && <Modal handleCancel={handleCancel} handleSubmit={handleSubmit} />}
      <Table
        columns={columns}
        data={set()}
        removeRow={removeRow}
        reorderData={reorderData}
      />
      <EditBtn
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleSave={handleSave}
        addRow={addRow}
        editCancel={editCancel}
      />
    </Container>
  )
};

export default Test;
