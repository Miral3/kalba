import React from 'react';
import "./Table.css";

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
["라바", 4.1667, 6, 25],
["볼러", 6, 5, 30],
["얼골", 4, 5, 20],
["헤헌", 6.6667, 3, 20]];

const set = troops.map((arr, idx) =>
  <tr key={idx} className="type troops">
    {arr.map((value, num) => {
      if (num === 0) {
        return <td className="type">{value}</td>
      } else if (num === 1) {
        return <td className="type">{Math.ceil(value * 1000) / 1000}</td>
      }
      else {
        return <td>{value}</td>
      }
    })}
  </tr>);

const TroopsTable = () => {
  return (
    <div className="table">
      <table className="apStandardTable">
        <thead className="head">
          <tr>
            <th className="type">종류</th>
            <th className="weight">비례 점수</th>
            <th className="maxScore">최대 점수</th>
            <th className="maxLevel last">최대 레벨</th>
          </tr>
        </thead>
        <tbody>
          {set}
        </tbody>
      </table>
    </div >
  );
};

export default TroopsTable;