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
    // data[category].push(["hi", {
    //   index: nextId,
    //   korean: "A",
    //   maxScore: 1,
    //   maxLevel: 2,
    //   value: 3,
    // }]);
    // setNextId(nextId + 1);
    // setData((prevState) => ({ ...prevState, }));
    setModalOn(true);
  }

  const handleCancel = () => {
    setModalOn(false);
  }
  if (loading) {
    return <div></div>
  }
  return (
    <div>
      {modalOn && <Modal handleCancel={handleCancel} />}
      <Table
        columns={columns}
        data={set()}
      />
      <button onClick={() => { addRow() }}>Add</button>
    </div>
  )
};

export default Test;
