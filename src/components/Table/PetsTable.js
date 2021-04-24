import React from 'react';
import "./Table.css";

const pets = [["L.A.S.S.I", 30, 10, 3],
["일렉트로 아울", 30, 10, 3],
["마이티 야크", 30, 10, 3],
["유니콘", 30, 10, 3]];

const set = pets.map((arr, idx) =>
  <tr className="type pets" key={idx}>
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

const PetsTable = () => {
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

export default PetsTable;