/* React */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

/* Styled */
import { CgArrowRightR } from 'react-icons/cg';

/* Sub Components */
import { getLoginToken, getLoginUser, getLoginUserNickname, isEmpty, logout } from '../../tools/tools';

const QuizFirstPage = ({ handleStart }) => {
  const name = getLoginUserNickname();
  const accountName = getLoginUser();
  const token = getLoginToken();
  const [passState, setPassState] = useState(false);
  const history = useHistory();

  useEffect(() => {
    isValidateLoginState();
    checkPassState();
  });

  const isValidateLoginState = () => {
    axios.post(
      '/account/login/name', {
      token: token,
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200 && !isEmpty(res.data.name)) {
        if (res.data.name !== accountName) {
          invalidLoginState();
        }
      } else {
        invalidLoginState();
      }
    }).catch(e => {
      invalidLoginState();
    });
  }

  const checkPassState = () => {
    axios.post(
      '/quiz/state', {
      name: accountName,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200 && !isEmpty(res.data.state)) {
        if (res.data.state === true) {
          setPassState(true);
        }
      }
    });
  }

  const invalidLoginState = () => {
    logout();
    alert("올바르지 못한 접근입니다.");
    history.push("/");
  }

  return (
    <div className="nameBlock">
      <span className="head">칼바클랜 공지 퀴즈</span>
      {
        passState ?
          <span className="body">{name}님은 이미 통과하였습니다.<br />다시 풀이하시겠습니까?</span> :
          <span className="body">{name}님 반갑습니다.</span>
      }
      <div className="button">
        <CgArrowRightR className="startBtn" onClick={() => handleStart()} />
      </div>
    </div>
  );
}

export default QuizFirstPage;