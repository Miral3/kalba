import React from 'react';
import "./StandardTable.css";

const troops = [["바바", 1.1111, 9, 10],
["아처", 1.6667, 9, 15],
["자이", 1.5, 10, 15],
["고블린", 1.875, 8, 15],
["월브", 2.7778, 9, 25],
["풍선", 2.7778, 9, 25],
["법사", 3, 10, 30],
["힐러", 5, 6, 30],
["용", 2.5, 8, 20],
["페카", 3.3333, 9, 30],
["베드", 3.5714, 7, 25],
["광부", 4.2857, 7, 30],
["일드", 7.5, 4, 30],
["예티", 10, 3, 30],
["미니언", 2.2222, 9, 20],
["호그", 3, 10, 30],
["발키리", 1.875, 8, 15],
["골렘", 1.5, 10, 15],
["마녀", 5, 5, 25],
["라바", 4.1667, 25],
["볼러", 6, 5, 30],
["얼골", 4, 5, 20],
["헤헌", 6.6667, 3, 20]];

const nameList = troops.map((_, i) =>
  <th>{troops[i][0]}</th>);
const scoreList = troops.map((_, i) =>
  <td>{troops[i][1]}</td>);
const maxLevelList = troops.map((_, i) =>
  <td>{troops[i][2]}</td>);
const maxScoreList = troops.map((_, i) =>
  <td>{troops[i][3]}</td>);

const TroopsTable = () => {
  return (
    <div className="table">
      <table className="apStandardTable">
        <thead>
          <tr>
            <th className="empty"></th>
            <th colspan="23" className="colspan heroes">유닛</th>
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

export default TroopsTable;