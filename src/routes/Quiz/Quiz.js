/* React */
import React, { useEffect, useState } from 'react';

/* Styled */
import styled from 'styled-components';
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import { CgArrowRightR } from "react-icons/cg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import OneOutlinedIcon from '@material-ui/icons/LooksOneOutlined';
import OneRoundedIcon from '@material-ui/icons/LooksOneRounded';
import TwoOutlinedIcon from '@material-ui/icons/LooksTwoOutlined';
import TwoRoundedIcon from '@material-ui/icons/LooksTwoRounded';
import ThreeOutlinedIcon from '@material-ui/icons/Looks3Outlined';
import ThreeRoundedIcon from '@material-ui/icons/Looks3Rounded';
import FourOutlinedIcon from '@material-ui/icons/Looks4Outlined';
import FourRoundedIcon from '@material-ui/icons/Looks4Rounded';
import FiveOutlinedIcon from '@material-ui/icons/Looks5Outlined';
import FiveRoundedIcon from '@material-ui/icons/Looks5Rounded';

/* Sub Components */
import quizData from './quizdata';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  height: 600px;
`;

const QuizBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 550px;
  @media (max-width: 550px) {
    width: auto;
    min-width:90%;
  }
  min-height: 370px;
  word-break: keep-all;
  font-family: "cocLight";
  ul {
    padding: 0;
  }
  button {
    width: 100%;
    background: none;
	  color: inherit;
	  border: none;
	  padding: 0;
	  font: inherit;
	  cursor: pointer;
  }
  .nameBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-family: "cocOpen";
      font-size: 50px;
      margin-bottom: 150px;
      @media(max-width: 500px) {
        font-size: 45px;
      }
    }
    .askName {
      font-size: 1.5rem;
      padding-bottom: 5px;
    }
    .inputBlock {
      display:flex;
      align-items: center;
      .nameInput {
        font-size: 12px;
        font-family: "cocLight";
        border: 2px solid #383E4C;
        border-radius: 4px;
        padding: 5px 7px;
        margin-right: 5px;
        line-height: 20px;
        width: auto;
        &:focus {
          outline: none;
        }
      }
      .start {
        font-size: 40px;
        color: #383E4C;
        cursor: pointer;
      }
    }
  }
    .remain {
      text-align: right;
      padding-bottom: 35px;
    }
  .quizBlock {
    .question {
      font-family: "cocOpen";
      font-size: 1.25rem;
    }
    .option {
      display: flex;
      align-items: center;
      position: relative;
      .checkbox {
        width: auto;
        height: auto;
        margin: 0;
      }
    }
    .buttons {
      display: flex;
      justify-content: space-between;
      color: #383E4C;
      .previous,
      .next {
        font-size: 50px;
        cursor: pointer;
      }
    }
  }
  .resultBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .thanks {
      position: static;
      font-size: 2rem;
      width: auto;
    }
    .info {
      position: static;
      .name, .score {
        font-size: 1.5rem;
      }
    }
    .reset {
      position: relative;
      top: 40px;
      width: auto;
      background-color: #383E4C;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .questioner {
      text-align: right;
    }
`;

const Quiz = () => {
  const [name, setName] = useState('');
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const answerList = Array(10).fill().map(() => Array(5).fill(false));

  useEffect(() => {
    setData(quizData);
    setCheckList(Array(10).fill().map(() => Array(5).fill(false)));
  }, []);

  const setAnswerList = () => {
    for (let i = 0; i < quizData.length; i++) {
      for (let j = 0; j < quizData[i].rightAnswer.length; j++) {
        answerList[i][quizData[i].rightAnswer[j] - 1] = true;
      }
    }
  }

  const displayItems = () => {
    if (idx === 0) {
      return createFirst();
    }
    else if (0 < idx && idx <= quizData.length) {
      return createQuiz();
    } else {
      return createResult();
    }
  }

  const onButtonClick = (type) => {
    if (type === "start") {
      if (name !== '') {
        setIdx(idx + 1);
      } else {
        alert("닉네임을 입력하세요.");
      }
    }
    else if (type === "prev") {
      setIdx(idx - 1);
    } else if (type === "next") {
      setIdx(idx + 1);
    }
  }

  const onChangeName = e => {
    setName(e.target.value);
  }

  const handleChange = (num) => {
    const changeCheck = checkList.map((check, idx1) =>
      check.map((data, idx2) => {
        if (idx1 === idx - 1 && idx2 === num) {
          data = !data;
        }
        return data;
      }));
    setCheckList(changeCheck);
  };

  const reset = () => {
    setName('');
    setIdx(0);
    setCheckList(Array(10).fill().map(() => Array(5).fill(false)));
  }

  const grade = () => {
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (JSON.stringify(checkList[i]) === JSON.stringify(answerList[i])) {
        score += 10;
      }
    }
    return score;
  }

  const createFirst = () => {
    return <div className="nameBlock">
      <span className="title">칼바클랜 공지 퀴즈</span>
      <span className="askName">이름을 입력하세요.</span>
      <div className="inputBlock">
        <input className="nameInput" value={name} onChange={onChangeName} placeholder="이름 입력" />
        <CgArrowRightR className="start" onClick={() => onButtonClick("start")} />
      </div>
    </div>
  }

  const highlightQuestion = (question) => {
    const questionSplitted = question.split("--");
    if(questionSplitted.length==3){
      return <>{questionSplitted[0]}<ins><b>{questionSplitted[1]}</b></ins>{questionSplitted[2]}</>;
    } else {
        return question;
    }
  }

  const createQuiz = () => {
    const index = idx - 1;
    return <>
      <span className="remain">남은 문항 수: {data.length - idx}</span>
      <div className="quizBlock">
        <span className="question">
          {highlightQuestion(data[index].question)}
        </span>
        <ul className="options">
          <li className="option">
            <FormControlLabel
              className="checkbox" control={<Checkbox checked={checkList[index][0]}
                onClick={() => handleChange(0)} icon={<OneOutlinedIcon />} checkedIcon={<OneRoundedIcon />}
              />}
            />
            <span className="contents">
              {data[index].answerOptions[0]}
            </span>
          </li>
          <li className="option">
            <FormControlLabel
              className="checkbox" control={<Checkbox checked={checkList[index][1]}
                onClick={() => handleChange(1)} icon={<TwoOutlinedIcon />} checkedIcon={<TwoRoundedIcon />}
              />}
            />
            <span className="contents">
              {data[index].answerOptions[1]}
            </span>
          </li>
          <li className="option">
            <FormControlLabel
              className="checkbox" control={<Checkbox checked={checkList[index][2]}
                onClick={() => handleChange(2)} icon={<ThreeOutlinedIcon />} checkedIcon={<ThreeRoundedIcon />}
              />}
            />
            <span className="contents">
              {data[index].answerOptions[2]}
            </span>
          </li>
          <li className="option">
            <FormControlLabel
              className="checkbox" control={<Checkbox checked={checkList[index][3]}
                onClick={() => handleChange(3)} icon={<FourOutlinedIcon />} checkedIcon={<FourRoundedIcon />}
              />}
            />
            <span className="contents">
              {data[index].answerOptions[3]}
            </span>
          </li>
          <li className="option">
            <FormControlLabel
              className="checkbox" control={<Checkbox checked={checkList[index][4]}
                onClick={() => handleChange(4)} icon={<FiveOutlinedIcon />} checkedIcon={<FiveRoundedIcon />}
              />}
            />
            <span className="contents">
              {data[index].answerOptions[4]}
            </span>
          </li>
        </ul>
        <div className="buttons">
          <GoArrowLeft className="previous" onClick={() => onButtonClick("prev")} />
          <GoArrowRight className="next" onClick={() => onButtonClick("next")} />
        </div>
      </div>
    </>
  }

  const createResult = () => {
    return <>
      <div className="resultBlock">
        <span className="thanks">수고하셨습니다.</span>
        <div className="info">
          <span className="name">{name}</span>
          <span> 님의 점수는 </span>
          <span className="score">{grade()}</span>
          <span>점 입니다.</span>
        </div>
        <button className="reset" onClick={() => reset()}>처음으로</button>
      </div>
      <span className="questioner">출제자: 달달</span>
    </>
  }

  setAnswerList();
  return (
    <Container>
      <QuizBlock idx={idx}>
        {displayItems()}
      </QuizBlock>
    </Container>
  );
}

export default Quiz;