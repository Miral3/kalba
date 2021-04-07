import React from 'react';
import "./StandardTable.css";

const siegeMachines = [["전차", 5, 4, 20], ["전비", 7.5, 4, 30],
["돌풍", 5, 4, 20], ["훈련소", 6.25, 4, 25], ["통나무", 7.5, 4, 30]];

const nameList = siegeMachines.map((_, i) =>
  <th>{siegeMachines[i][0]}</th>);
const scoreList = siegeMachines.map((_, i) =>
  <td>{siegeMachines[i][1]}</td>);
const maxLevelList = siegeMachines.map((_, i) =>
  <td>{siegeMachines[i][2]}</td>);
const maxScoreList = siegeMachines.map((_, i) =>
  <td>{siegeMachines[i][3]}</td>);

const SiegeMachineTable = () => {
  return (
    <div className="table">
      <table className="apStandardTable">
        <thead>
          <tr>
            <th className="empty"></th>
            <th colspan="5" className="colspan heroes">시즈 머신</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th className="empty"></th>
            {nameList}
          </tr>
        </thead>
        <tbody>
          <tr className="type maxScore">
            <td className="type">최대 점수</td>
            {maxScoreList}
          </tr>
          <tr className="type maxLevel">
            <td className="type">최대 레벨</td>
            {maxLevelList}
          </tr>
          <tr className="type weights">
            <td className="type">비례 점수</td>
            {scoreList}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SiegeMachineTable;