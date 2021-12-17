import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import Header from '../../layouts/Main/Header';
import { LoginButton } from "../../components/Button";
import { isLogin } from "../../tools/tools";
import AccountInfo from "../../components/AccountInfo";

import styled from "styled-components";

const LoginStateWrapper = styled.div`
  i {
    cursor: pointer;
    font-size: 30px;
    color: white;
  }
`

const HeaderContainer = ({ visible }) => {
  const el = useRef();
  const [showProfile, setShowProfile] = useState(false);
  const onClick = () => setShowProfile(!showProfile);

  const handleCloseModal = e => {
    if (el.current && !el.current.contains(e.target)) {
      setShowProfile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    return () => {
      window.removeEventListener('click', handleCloseModal);
    };
  }, [el]);

  if (!visible) return null;

  return (
    <Header>
      {isLogin() ?
        <LoginStateWrapper ref={el}>
          <i className="fas fa-user-circle" onClick={onClick} />
          {showProfile ? <AccountInfo /> : <div></div>}
        </LoginStateWrapper> :
        <LoginButton children="로그인" />}
    </Header>
  );
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['header', 'visible'])
  }),
  (dispatch) => ({

  })
)(HeaderContainer);