/* React */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

/* Sub Components */
import { isLogin } from "../../tools/tools";
import { QuizFirstPage, QuizQuestionPage } from '../../containers/Quiz';
import { QuizWrapper } from '../../components/Quiz';

const Quiz = () => {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(!start);
  }

  if (!isLogin()) {
    alert("로그인이 필요한 서비스입니다.");
    return (
      <Redirect to={"/"} />
    )
  }

  return (
    <QuizWrapper>
      {
        !start ?
          <QuizFirstPage handleStart={handleStart} /> :
          <QuizQuestionPage handleStart={handleStart} />
      }
    </QuizWrapper>
  );
}

export default Quiz;