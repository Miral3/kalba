import React from 'react';


const heroes = [["바바리안 킹", 50, 80, 0.625],
["아처 퀸", 50, 80, 0.625],
["그랜드 워든", 50, 55, 0.9091],
["로얄 챔피언", 50, 30, 1.6667]];



const set = heroes.map((arr, idx) =>
  <tr className="type heroes" key={idx}>
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
    <div className="tableBlock">
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

export default HeroesTable;