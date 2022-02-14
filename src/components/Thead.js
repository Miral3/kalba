import React from 'react';

const Thead = (props) => {
  const type = props.type;
  const getClassNamesFor = (name) => {
    if (!props.sortConfig) {
      return;
    }
    return props.sortConfig.key === name ? props.sortConfig.direction : undefined;
  };

  const thByType = () => {
    if (type === 'score') {
      return <>
        <th className={`${getClassNamesFor('trophies')} side`} onClick={() => props.requestSort('trophies')}>트로피</th>
        <th className={`${getClassNamesFor('townHallLevel')} side`} onClick={() => props.requestSort('townHallLevel')}>홀</th>
        <th className={`${getClassNamesFor('yonghaScore')} side`} onClick={() => props.requestSort('yonghaScore')}>공격력</th>
      </>
    } else if (type === 'donations') {
      return <>
        <th className={`${getClassNamesFor('donations')} side`} onClick={() => props.requestSort('donations')}>지원량</th>
        <th className={`${getClassNamesFor('role')} side`} onClick={() => props.requestSort('role')}>현재직책</th>
        <th className={`${getClassNamesFor('role')} side`} onClick={() => props.requestSort('role')}>예상직책</th>
      </>
    } else if (type === 'memberState') {
      return <>
        <th className={`${getClassNamesFor('register')} side`} onClick={() => props.requestSort('member')}>회원가입</th>
        <th className={`${getClassNamesFor('quizScore')} side`} onClick={() => props.requestSort('quizScore')}>퀴즈 점수</th>
        <th className='league side'>리그전<br /> 미공 | 경고</th>
      </>
    }
  }

  return (
    <thead className="head">
      <tr>
        <th className={`${getClassNamesFor('rank')} rank`} onClick={() => props.requestSort('rank')}>#</th>
        <th className={`${getClassNamesFor('name')} name`} onClick={() => props.requestSort('name')}>이름</th>
        {thByType()}
      </tr>
    </thead>
  )
}

export default Thead;