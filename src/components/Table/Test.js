import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";

import Table from "./Table";
import Modal from "../Modal";

const Test = (props) => {
  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalOn, setModalOn] = useState(false);
  const category = props.category === "troops" ? "units" : props.category;

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
          setNextId(res.data[category].length);
          setLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "korean",
        Header: "종류",
      },
      {
        accessor: "maxScore",
        Header: "최대 점수",
      },
      {
        accessor: "maxLevel",
        Header: "최대 레벨",
      },
      {
        accessor: "value",
        Header: "비례 점수",
      },
    ], []);

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

  const save = async () => {
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

  const handleSubmit = async (form) => {
    data[category].push([form.englishName, {
      index: nextId,
      korean: form.korean,
      maxScore: form.maxScore,
      maxLevel: form.maxLevel,
      value: form.value,
    }]);
    setNextId(nextId + 1);
    setData((prevState) => ({ ...prevState, }));
    await save();
  }

  if (loading) {
    return <div></div>
  }
  return (
    <div>
      {modalOn && <Modal handleCancel={handleCancel} handleSubmit={handleSubmit}/>}
      <Table
        columns={columns}
        data={set()}
      />
      <button onClick={() => { addRow() }}>Add</button>
    </div>
  )
};

export default Test;
