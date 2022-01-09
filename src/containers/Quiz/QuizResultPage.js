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
  const [wrongAnswer, setWrongAnswer] = useState("");
  const history = useHistory();
  // const temp = new Array(checkList.length).fill(false);

  useEffect(() => {
    markQuiz();
    isValidateLoginState();
    if (isPassScore(score)) {
      savePassedUserInDB(score);
    }
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
        setWrongAnswer(wrongAnswerListToString(res.data.wrongAnswerList));
        // test(res.data.wrongAnswerList);
        setScore(res.data.score);
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

  const wrongAnswerListToString = (wrongAnswerList) => {
    let ret = "";
    for (let i = 0; i < wrongAnswerList.length - 1; i++) {
      ret += wrongAnswerList[i] + ", ";
    }
    ret += wrongAnswerList[wrongAnswerList.length - 1];
    return ret;
  }

  // const test = (wrongAnswerList) => {
  //   const a = temp.map((val, idx) => {
  //     if (wrongAnswerList.includes(idx + 1)) {
  //       val = !val;
  //     }
  //     return val;
  //   });
  //   console.log(a);
  // }

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

  return (
    <>
      {score === -1 ? (
        <div className="resultBlock"><span className="thanks">채점중....</span>
        </div>)
        : (
          <div className="resultBlock">
            <span className="thanks">수고하셨습니다.</span>
            <div className="info">
              <span className="name">{name}</span>
              <span> 님의 점수는 </span>
              <span className="score">{score}</span>
              {isPassScore(score) ? <span>점으로 통과하셨습니다!</span> : <span>점으로<br />아쉽게도 커트라인을 넘기지 못하였습니다.<br />틀린 문제는 {wrongAnswer} 입니다.</span>}
            </div>
            {isPassScore(score) ? <button className="reset" onClick={() => history.push("/")}>메인으로</button> : <button className="reset" onClick={() => reset()}>다시풀기</button>}
          </div>
        )
      }
      <span className="questioner">출제자: 달달</span>
    </>
  );
}

export default QuizResultPage;