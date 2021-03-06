import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';

import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import axios from "axios";
import { getLoginToken, isEmpty, getLoginUserTag, translateRole } from "../../tools/tools";
import { useHistory } from 'react-router-dom';

const Login = ({ AuthActions, username, password }) => {
  const [loginForm, setLoginForm] = useState({ name: "", password: "" });
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    loginForm[name] = value;
    setLoginForm(loginForm);
    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  }

  const login = async () => {
    await axios.post(
      '/account/login', {
      username: loginForm["username"],
      password: loginForm["password"]
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('name', loginForm["username"]);
        getNickname();
      } else {
        alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
      }
    }).catch(e => {
      if (!isEmpty(e.response.status) && e.response.status === 401) {
        alert("계정 정보가 올바르지 않습니다. 다시 한번 확인해주세요.");
      } else {
        alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
      }
    });
  };

  const getNickname = async () => {
    await axios.post(
      '/account/info', {
      name: loginForm["username"],
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getLoginToken()}`
      }
    }).then(res => {
      if (res.status === 200 && isEmpty(res.data.message)) {
        window.localStorage.setItem('nickname', res.data.nickname);
        window.localStorage.setItem('tag', res.data.tag);
        getUserData().then(() => history.push("/"));
      } else {
        alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
      }
    }).catch(e => {
      alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
    });
  };

  const getUserData = async () => {
    await axios.post(
      "/coc/clan/member/statistic/tag", {
      tag: getLoginUserTag()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        window.localStorage.setItem('yonghaScore', res.data.yonghaScore);
        window.localStorage.setItem('role', translateRole(res.data.role));
      }
    }).catch(e => {
      console.log(e);
    });
  };

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
        onKeyPress={onKeyPress}
      />
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={handleChange}
        onKeyPress={onKeyPress}
      />
      <AuthButton onClick={login}>로그인</AuthButton>
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