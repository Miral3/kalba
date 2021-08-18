import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../redux/modules/auth';

import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import axios from "axios";
import { isEmpty } from "../../tools/tools";

const Register = ({ AuthActions, nickname, tag, name, password, passwordConfirm }) => {
  const [registerForm, setRegisterForm] = useState({nickname: "", tag: "", name: "", password:"", passwordConfirm:""});
  const handleChange = (e) => {
    const { name, value } = e.target;
    registerForm[name] = value;
    setRegisterForm(registerForm);
    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
  }

  const getTag = async (tag) => {
    await axios.post(
      '/coc/clan/member/name', {
        tag: tag
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
      if(!isEmpty(res.data.name)){
        registerForm["nickname"]=res.data.name;
        setRegisterForm(registerForm);
        return res.data.name;
      } else {
        alert("해당 태그명으로 가입된 칼 없는 바바리안 유저가 없습니다.");
        return undefined;
      }
    }).catch(e => {
      alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
      return undefined;
    });
  }

  const register = async () => {
    if(registerForm["password"]!==registerForm["passwordConfirm"]){
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      registerForm["nickname"] = undefined;
      await getTag(registerForm["tag"]).then(res => {
          if(!isEmpty(registerForm["nickname"])){
            axios.post(
              '/account/register', {
                nickname: registerForm["nickname"],
                tag: registerForm["tag"],
                name: registerForm["name"],
                password: registerForm["password"]
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(res => {
              if(res.status === 201){
                alert("회원가입에 성공하였습니다. 반갑습니다!");
              } else {
                alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
              }
            }).catch(e => {
              if(!isEmpty(e.response.status) && e.response.status === 409){
                alert(e.response.data.message);
              } else {
                alert("예상하지 못한 에러가 발생하였습니다. 다시 한번 시도해주세요.");
              }
            });
          }
        }
      )
    }
  };

  useEffect(() => {
    return () => AuthActions.initializeForm('register');
  }, [AuthActions]);

  return (
    <AuthContent title="회원가입">
      <InputWithLabel
        label="태그번호"
        name="tag"
        placeholder="태그번호"
        value={tag}
        onChange={handleChange}
      />
      <InputWithLabel
        label="아이디"
        name="name"
        placeholder="아이디"
        value={name}
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
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={handleChange}
      />
      <AuthButton onClick={register}>회원가입</AuthButton>
      <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
    </AuthContent>
  );
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['register', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);