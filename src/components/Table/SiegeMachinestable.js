import React from 'react';
import "./Table.css";

const siegeMachines = [["전차", 5, 4, 20], ["전비", 7.5, 4, 30],
["돌풍", 5, 4, 20], ["훈련소", 6.25, 4, 25], ["통나무", 7.5, 4, 30]];

const set = siegeMachines.map((arr, idx) =>
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

const SiegeMachineTable = () => {
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

export default SiegeMachineTable;