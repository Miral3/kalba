import React from 'react';
import "./Table.css";

const heroes = [["바바리안 킹", 50, 75, 0.6667],
["아처 퀸", 50, 75, 0.6667],
["그랜드 워든", 50, 50, 1],
["로얄 챔피언", 50, 25, 2]];



const set = heroes.map((arr, idx) =>
  <tr key={idx} className="type heroes">
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

const HeroesTable = () => {
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

export default HeroesTable;