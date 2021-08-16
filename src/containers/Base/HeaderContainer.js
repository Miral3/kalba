import React from 'react';
import { connect } from 'react-redux';

import Header, { LoginButton } from '../../layouts/Main/Header';


const HeaderContainer = ({ visible }) => {

  if (!visible) return null;

  return (
    <Header>
      <LoginButton />
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