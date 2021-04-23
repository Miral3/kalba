import React from 'react';
import "./Table.css";

const spells = [["번개", 20, 9, 2.2222],
["치유", 30, 8, 3.75],
["분노", 30, 6, 5],
["이동", 30, 4, 7.5],
["얼음", 30, 7, 4.2857],
["복제", 15, 6, 2.5],
["투명", 25, 4, 6.25],
["독", 30, 7, 4.2857],
["지진", 25, 5, 5],
["신속", 25, 5, 5],
["해골", 10, 7, 1.4286],
["박쥐", 20, 5, 4]];

const set = spells.map((arr, idx) =>
  <tr key={idx} className="type spells">
    {arr.map((value, num) => {
      if (num === 0) {
        return <td className="type name">{value}</td>
      } else if (num === 3) {
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
            <th className="weight">최대 점수</th>
            <th className="maxScore">최대 레벨</th>
            <th className="maxLevel last">비례 점수</th>
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