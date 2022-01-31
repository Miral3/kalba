/* React */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/* Sub Components */
import { getLoginToken, getLoginUser, getLoginUserNickname, isEmpty, logout } from "../../tools/tools";
import axios from "axios";

const QuizResultPage = ({ checkList, reset }) => {
  const name = getLoginUserNickname();
  const accountName = getLoginUser();
  const [score, setScore] = useState(-1);
  const history = useHistory();
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [resultPage, setResultPage] = useState(false);

  useEffect(() => {
    setWrongAnswer(new Array(checkList.length).fill(true));
    markQuiz();
    isValidateLoginState();
    // eslint-disable-next-line
  }, []);

  const checkListToAnswerSheet = () => {
    let sheet = [];
    for (let i = 0; i < checkList.length; i++) {
      let s = []
      for (let j = 0; j <= checkList[0].length; j++) {
        if (checkList[i][j]) {
          s.push(j + 1);
        }
      }
      sheet.push(s);
    }
    return sheet;
  }

  const markQuiz = async () => {
    await axios.post(
      '/quiz/mark', {
      sheet: checkListToAnswerSheet(),
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getLoginToken()}`
      }
    }).then(res => {
      if (res.status === 200 && res.data.score !== undefined) {
        checkWrongAnswer(res.data.wrongAnswerList);
        setScore(res.data.score);
        if (isPassScore(res.data.score)) {
          savePassedUserInDB(res.data.score);
        }
      } else {
        alert("채점중 에러가 발생하였습니다.");
      }
    }).catch(e => {
      alert("채점중 에러가 발생하였습니다.");
    });
    return score;
  }

  const isPassScore = (score) => {
    return score >= 100;
  }

  const checkWrongAnswer = (wrongAnswerList) => {
    setWrongAnswer(prev => prev.map((item, idx) => wrongAnswerList.includes(idx + 1) ? !item : item));
  }

  const savePassedUserInDB = (score) => {
    axios.post(
      '/quiz/pass', {
      name: accountName,
      score: score
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getLoginToken()}`
      }
    }).then(res => {
      if (!(res.status === 201 && !isEmpty(res.data.message))) {
        alert("에러가 발생하였습니다.")
      }
    }).catch(e => {
      alert("에러가 발생하였습니다.")
    });
  }

  const isValidateLoginState = () => {
    axios.post(
      '/account/login/name', {
      token: getLoginToken(),
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

  const invalidLoginState = () => {
    logout();
    alert("올바르지 못한 접근입니다.");
    history.push("/");
  }

  const displayResult = () => {
    return (
      <div className='result'>
        <div className='left list'>
          <ul>
            {wrongAnswer.slice(0, 5).map((el, idx) => (
              <li key={idx}>
                <span className='number'>{idx + 1}: </span>
                <span>{el ? 'O' : 'X'}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='right list'>
          <ul>
            {wrongAnswer.slice(5, 10).map((el, idx) => (
              <li key={idx}>
                <span className='number'>{idx + 6}: </span>
                <span>{el ? 'O' : 'X'}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const handleResultPage = () => {
    setResultPage(!resultPage);
  }

  return (
    <>
      {
        score === -1 ?
          (<div className="resultBlock"><span className="thanks">채점중....</span></div>)
          :
          (<div className="resultBlock">
            {
              !resultPage ?
                <div className="info">
                  <div className="thanks">
                    <span >수고하셨습니다.</span>
                  </div>
                  <div>
                    <span className="name">{name}</span>
                    <span> 님의 점수는 </span>
                    <span className="score">{score}</span>
                    <span>점으로</span>
                  </div>
                  <div>
                    {isPassScore(score) ?
                      <span>점으로 통과하셨습니다!</span> :
                      <span>아쉽게도 커트라인을 넘기지 못하였습니다.</span>}
                  </div>
                </div>
                :
                displayResult()
            }
            <div className='buttonBlock'>
              {isPassScore(score) ?
                <div className="success">
                  <button className="button" onClick={() => history.push("/")}>메인으로</button>
                </div>
                :
                <div className="fail">
                  <button className="button" onClick={() => reset()}>다시풀기</button>
                  {!resultPage && <button className="button" onClick={() => handleResultPage()}>오답노트</button>}
                </div>
              }
            </div>
          </div>
          )
      }
      <span className="questioner">출제자: 달달</span>
    </>
  );
}

export default QuizResultPage;