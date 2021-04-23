import React from 'react';
import "./Table.css";

const troops = [["바바리안", 10, 9, 1.1111],
["아처", 15, 9, 1.6667],
["자이언트", 15, 10, 1.5],
["고블린", 15, 8, 1.875],
["해골 돌격병", 25, 9, 2.7778],
["해골 비행선", 25, 9, 2.7778],
["마법사", 30, 10, 3],
["치유사", 30, 6, 5],
["드래곤", 20, 8, 2.5],
["P.E.K.K.A", 30, 9, 3.3333],
["베이비 드래곤", 25, 7, 3.5714],
["광부", 30, 7, 4.2857],
["일렉트로 드래곤", 30, 4, 7.5],
["예티", 30, 3, 10],
["미니언", 20, 9, 2.2222],
["호그 라이더", 30, 10, 3],
["발키리", 15, 8, 1.875],
["골렘", 15, 10, 1.5],
["마녀", 25, 5, 5],
["라바 하운드", 25, 6, 4.1667],
["볼러", 30, 5, 6],
["얼음 골렘", 20, 5, 4],
["헤드 헌터", 20, 3, 6.6667]];

const set = troops.map((arr, idx) =>
  <tr key={idx} className="type troops">
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