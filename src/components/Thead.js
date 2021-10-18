import React, { useEffect, useState } from 'react';

const Thead = (props) => {
  const [type, setType] = useState(props.type);
  useEffect(() => setType(props.type), [props.type]);
  const thByType = () => {
    if (type === 'score') {
      return <>
        <th className="trophies side">트로피</th>
        <th className="townHallLevel side">홀</th>
        <th className="attackPower side">공격력</th>
      </>
    } else if (type === 'donations') {
      return <>
        <th className="dontaions side">지원량</th>
        <th className="currentRole side">현재직책</th>
        <th className="expectedRole side">예상직책</th>
      </>
    } else if (type === 'memberState') {
      return <>
        <th className="register side">회원가입</th>
        <th className="quizScore side">퀴즈 점수</th>
        <th className="league side">리그전<br /> 미공 | 경고</th>
      </>
    }
  }
  return (
    <thead className="head">
      <tr>
        <th className="rank">#</th>
        <th className="name">이름</th>
        {thByType()}
      </tr>
    </thead>
  )
}

export default Thead;