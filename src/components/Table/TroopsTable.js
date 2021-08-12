import React from 'react';


const troops = [["바바리안", 10, 10, 1],
["아처", 15, 10, 1.5],
["자이언트", 15, 10, 1.5],
["고블린", 20, 8, 2.5],
["해골 돌격병", 25, 10, 2.5],
["해골 비행선", 30, 10, 3.3333],
["마법사", 30, 10, 3],
["치유사", 30, 7, 4.2857],
["드래곤", 30, 9, 3.75],
["P.E.K.K.A", 25, 9, 2.7778],
["베이비 드래곤", 30, 8, 3.75],
["광부", 20, 7, 2.8571],
["일렉트로 드래곤", 25, 5, 6.25],
["예티", 25, 3, 8.3333],
["드래곤 라이더", 25, 3, 8.3333],
["미니언", 20, 10, 2],
["호그 라이더", 20, 10, 2],
["발키리", 15, 9, 1.6667],
["골렘", 15, 10, 1.5],
["마녀", 25, 5, 5],
["라바 하운드", 20, 6, 3.3333],
["볼러", 20, 5, 4],
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

export default TroopsTable;