import React from 'react';
import "./StandardTable.css";

const spells = [["번개", 2.2222, 9, 20],
["치유", 3.75, 8, 30],
["분노", 5, 6, 30],
["이동", 7.5, 4, 30],
["얼음", 4.2857, 7, 30],
["복제", 2.5, 6, 15],
["투명", 6.25, 4, 25],
["독", 4.2857, 7, 30],
["지진", 5, 5, 25],
["신속", 5, 5, 25],
["해골", 1.4286, 7, 10],
["박쥐", 4, 5, 20]];

const nameList = spells.map((_, i) =>
  <th>{spells[i][0]}</th>);
const scoreList = spells.map((_, i) =>
  <td>{spells[i][1]}</td>);
const maxLevelList = spells.map((_, i) =>
  <td>{spells[i][2]}</td>);
const maxScoreList = spells.map((_, i) =>
  <td>{spells[i][3]}</td>);

const SpellsTable = () => {
  return (
    <div className="table">
      <table className="apStandardTable">
        <thead>
          <tr>
            <th className="empty"></th>
            <th colspan="12" className="colspan heroes">마법</th>
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

export default SpellsTable;