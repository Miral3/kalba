import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
`;

const Register = () => {
  return (
    <Container>
      <span className="title">회원가입</span>
      {/* <div className="info">
        <input className="name" value={name} onChange={onChangeName} placeholder="이름" />
        <input className="tag" value={tag} onChange={onChangeName} placeholder="태그" />
        <input className="id" value={id} onChange={onChangeName} placeholder="아이디" />
        <input className="password" value={password} onChange={onChangeName} placeholder="패스워드" />
        <input className="rePassword" value={rePassword} onChange={onChangeName} placeholder="패스워드 재입력" />
        <button className="submit" onClick={() => submit()}>회원가입</button>
      </div> */}
    </Container>
  );
}

export default Register;