import React from 'react';


const siegeMachines = [["파괴 전차", 25, 4, 6.25],
["전투 비행선", 30, 4, 7.5],
["바위 비행선", 20, 4, 5],
["시즈 훈련소", 25, 4, 6.25],
["통나무 발사기", 25, 4, 6.25]];

const set = siegeMachines.map((arr, idx) =>
  <tr className="type troops" key={idx}>
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

const SiegeMachineTable = () => {
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

export default SiegeMachineTable;