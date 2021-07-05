import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from '../../redux/modules/base';
import { AuthWrapper } from '../../components/Auth';
import { Login, Register } from '../../containers/Auth';

const Auth = ({ BaseActions }) => {

  useEffect(() => {
    BaseActions.setHeaderVisibility(false);
    return () => BaseActions.setHeaderVisibility(true);
  }, [BaseActions]);

  return (
    <AuthWrapper>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
    </AuthWrapper>
  );

}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Auth);