import React from 'react';
import "./Table.css";

const heroes = [["킹", 0.6667, 50, 75],
["퀸", 0.6667, 50, 75],
["워든", 1, 50, 50],
["로챔", 2, 50, 25]];


const set = heroes.map((arr, idx) =>
  <tr key={idx} className="type heroes">
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