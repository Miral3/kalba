import React from 'react';
import { connect } from 'react-redux';

import Header, { LoginButton } from '../../layouts/Main/Header';
import { getLoginUserNickname, isLogin } from "../../tools/tools";
import LogoutButton from "../../layouts/Main/Header/HeaderLoginButton/HeaderLogoutButton";


const HeaderContainer = ({ visible }) => {
  if (!visible) return null;
  return (
    <Header>
      <span style={{color:"white"}}>{isLogin()?getLoginUserNickname()+"님 반갑습니다 ":""}
      </span>
      {isLogin()?<LogoutButton />:<LoginButton />}
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