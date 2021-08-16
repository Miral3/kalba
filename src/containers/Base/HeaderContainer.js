import React from 'react';
import { connect } from 'react-redux';

import Header, { LoginButton } from '../../layouts/Main/Header';
import { getLoginUser, isLogin } from "../../tools/tools";


const HeaderContainer = ({ visible }) => {
  console.log(isLogin());
  if (!visible) return null;
  return (
    <Header>
      {isLogin()?getLoginUser():<LoginButton />}
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