import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../layouts/Main/Header';
import { LoginButton } from "../../components/Button";
import { isLogin, getLoginUserTag } from "../../tools/tools";
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
  const history = useHistory();
  const linkTag = getLoginUserTag() ? getLoginUserTag().substr(1) : null;
  const [showProfile, setShowProfile] = useState(false);
  const onClick = () => setShowProfile(!showProfile);

  const handleCloseModal = e => {
    if (el.current && !el.current.contains(e.target)) {
      setShowProfile(false);
    }
  }

  const moveProfilePage = () => {
    setShowProfile(false);
    history.push(`/profile/${linkTag}`);
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
          {showProfile ? <AccountInfo moveProfilePage={moveProfilePage} /> : <div></div>}
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