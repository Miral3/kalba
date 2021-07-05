import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';

import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';

const Login = ({ AuthActions, username, password }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  }

  useEffect(() => {
    return () => AuthActions.initializeForm('login');
  }, [AuthActions]);

  return (
    <AuthContent title="로그인">
      <InputWithLabel
        label="아이디"
        name="username"
        placeholder="아이디"
        value={username}
        onChange={handleChange}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <AuthButton>로그인</AuthButton>
      <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
    </AuthContent>
  );
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['login', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);