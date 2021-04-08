import React from 'react';
import "./Table.css";

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

const set = spells.map((arr, idx) =>
  <tr key={idx} className="type spells">
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

const SpellsTable = () => {
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

export default SpellsTable;