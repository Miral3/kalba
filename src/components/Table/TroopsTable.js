import React from 'react';
import "./Table.css";

const troops = [["바바리안", 10, 10, 1],
["아처", 15, 10, 1.5],
["자이언트", 15, 10, 1.5],
["고블린", 15, 8, 1.875],
["해골 돌격병", 30, 10, 3],
["해골 비행선", 30, 9, 3.3333],
["마법사", 30, 10, 3],
["치유사", 30, 7, 4.2857],
["드래곤", 25, 8, 3.125],
["P.E.K.K.A", 25, 9, 2.7778],
["베이비 드래곤", 25, 8, 3.125],
["광부", 25, 7, 3.5714],
["일렉트로 드래곤", 25, 4, 6.25],
["예티", 30, 3, 10],
["미니언", 20, 10, 2],
["호그 라이더", 25, 10, 2.5],
["발키리", 15, 9, 1.6667],
["골렘", 15, 10, 1.5],
["마녀", 25, 5, 5],
["라바 하운드", 25, 6, 4.1667],
["볼러", 25, 5, 5],
["얼음 골렘", 20, 6, 3.3333],
["헤드 헌터", 15, 3, 5]];

const set = troops.map((arr, idx) =>
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

const TroopsTable = () => {
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

export default TroopsTable;