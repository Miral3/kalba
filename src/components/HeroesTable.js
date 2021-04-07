import React from 'react';
import "./StandardTable.css";

const HeroesTable = () => {
  return (
    <div className="table">
      <table className="apStandardTable">
        <thead>
          <tr>
            <th className="empty"></th>
            <th colspan="4" className="colspan heroes">영웅</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th className="empty"></th>
            <th className="king">킹</th>
            <th className="queen">퀸</th>
            <th className="warden">워든</th>
            <th className="champion">로챔</th>
          </tr>
        </thead>
        <tbody>
          <tr className="type weights">
            <td className="type">비례점수</td>
            <td className="kingWeight">0.6667</td>
            <td className="queenWeight">0.6667</td>
            <td className="wardenWeight">1</td>
            <td className="championWeight">2</td>
          </tr>
          <tr className="type maxScore">
            <td className="type">최대점수</td>
            <td className="kingWeight">50</td>
            <td className="queenWeight">50</td>
            <td className="wardenWeight">50</td>
            <td className="championWeight">50</td>
          </tr>
          <tr className="type maxLevel">
            <td className="type">최대레벨</td>
            <td className="kingWeight">75</td>
            <td className="queenWeight">75</td>
            <td className="wardenWeight">50</td>
            <td className="championWeight">25</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HeroesTable;