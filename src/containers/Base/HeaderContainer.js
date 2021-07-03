import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header, { LoginButton } from '../../layouts/Main/Header';


class HeaderContainer extends Component {
  render() {
    const { visible } = this.props;
    if (!visible) return null;

    return (
      <Header>
        <LoginButton />
      </Header>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['header', 'visible'])
  }),
  (dispatch) => ({

  })
)(HeaderContainer);