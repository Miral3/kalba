import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import axios from "axios";
import {isEmpty} from "../../tools/tools";
import {Button} from "@material-ui/core";

const Container = styled.div`
  display: flex;  
  height: auto;
  margin-top: 1rem;
  justify-content: space-around;
  width:100%;
  
  .tableBlock {
    padding-bottom: 3rem;
    width: 100%;

    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  .head tr th {
    position: sticky;
    top: 0;
    font-weight: normal;
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-size: 14px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};

    @media (max-width: 425px) {
      padding: 12px 12px;
    }
    @media (max-width: 385px) {
      font-size: 12px;
      padding: 12px 8px;
    }
  }

  th,
  td {
    padding: 0.5rem;
  }
  tbody {
    background-color: ${({ theme }) => theme.bgColors.listContents};
  }
  tbody tr td {
    border-bottom: ${({ theme }) => theme.borderColors.list};
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;

    color: ${({ theme }) => theme.fontColors.listInfo};
  }

  tbody tr .name {
    width: 40%;

    color: ${({ theme }) => theme.fontColors.listName};
  }
`

const StandardList = (props) => {
  const [data, setData] = useState([]);
  const category = props.category;
  const editorMode = isEmpty(props.editorMode)?false:props.editorMode;

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
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const dataPreprocess = (data) => {
    console.log(data)
    const classNameArr = ["heroes", "pets", "units", "spells", "siegeMachines"];
    for(let i=0; i<classNameArr.length; i++){
      data[classNameArr[i]] = Object.entries(data[classNameArr[i]]);
      data[classNameArr[i]].sort((a, b) => {
        return a[1].index - b[1].index;
      });
    }
    return data;
  }

  const changeHandle = (e) => {
    const { id, className, value } = e.target;
    data[category][id][1][className] = value;
    if(className === "maxScore" || className === "maxLevel"){
      data[category][id][1].value = Math.round(data[category][id][1].maxScore / data[category][id][1].maxLevel * 1000) / 1000;
    }
    setData(data)
  }

  const set = () => {
    console.log(data[category])
    if(editorMode){
      return data[category].map((element, idx) =>
          <tr className={`type ${category}`} key={element[1].index}>
            <td className="name"><input type="text" onChange={changeHandle} id={idx} className="korean" defaultValue={element[1].korean}/></td>
            <td className="maxScore"><input type="number" onChange={changeHandle} id={idx} className="maxScore" defaultValue={element[1].maxScore}/></td>
            <td className="maxLevel"><input type="number" onChange={changeHandle} id={idx} className="maxLevel" defaultValue={element[1].maxLevel}/></td>
            <td className="scoreCoefficient">{data[category][idx][1].value}</td>
          </tr>);
    } else {
      return data[category].map((element) =>
          <tr className={`type ${category}`} key={element[1].index}>
            <td className="name">{element[1].korean}</td>
            <td className="maxScore">{element[1].maxScore}</td>
            <td className="maxLevel">{element[1].maxLevel}</td>
            <td className="scoreCoefficient">{element[1].value}</td>
          </tr>);
    }
  }
  const test = () => {
    console.log("test");
  }
  // const temp = data[1]; // 옮기고싶은 데이터
  // const idx = 1; // 옮기고싶은 위치
  // data.splice(data.indexOf(temp), idx);
  // data.unshift(temp);

  return (
    <Container>
      <div className="tableBlock">
        <table className="apStandardTable">
          <thead className="head">
            <tr>
              <th className="type">종류</th>
              <th className="weight">최대 점수</th>
              <th className="maxScore">최대 레벨</th>
              <th className="maxLevel last">비례 점수</th>
            </tr>
          </thead>
          <tbody>
            {isEmpty(data)?
              <tr className={"loading"} key={0}>
                <td className="name">loading...</td>
                <td className="maxScore"> </td>
                <td className="maxLevel"> </td>
                <td className="scoreCoefficient"> </td>
              </tr>
              :set()}
          </tbody>
        </table>
        {editorMode?(<div><br></br><Button
            className="saveBtn"
            onClick={test}
            color="primary"
        >
          <div className="text">
            저장하기
          </div>
        </Button></div>):<></>}
      </div >
    </Container>
  );
};

export default StandardList;