/* React */
import React, { useEffect, useState } from 'react';

/* Styled */
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
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
import QuizResultPage from './QuizResultPage';

const QuizQuestionPage = ({ handleStart }) => {
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState([]);
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    setData(quizData);
    setCheckList(Array(quizData.length).fill().map(() => Array(5).fill(false)));
  }, []);

  const onButtonClick = (type) => {
    if (type === "prev") {
      setIdx(idx - 1);
    } else if (type === "next") {
      setIdx(idx + 1);
    }
  }

  const handleChange = (num) => {
    const changeCheck = checkList.map((check, idx1) =>
      check.map((data, idx2) => {
        if (idx1 === idx && idx2 === num) {
          data = !data;
        }
        return data;
      }));
    setCheckList(changeCheck);
  };

  const highlightText = (text) => {
    const textSplitted = text.split("--");
    if (textSplitted.length % 2 === 1) {
      return <>
        {textSplitted.map((txt, idx) => (idx % 2 === 1 ?
          <ins key={txt.toString()}><b>{txt}</b></ins> : <span key={txt.toString()}>{boldText(txt)}</span>))}
      </>
    } else {
      return boldText(text);
    }
  }

  const boldText = (text) => {
    const textSplitted = text.split("*");
    if (textSplitted.length % 2 === 1) {
      return <>
        {textSplitted.map((txt, idx) => (idx % 2 === 1 ?
          <b key={txt.toString()}>{txt}</b> : <span key={txt.toString()}>{txt}</span>))}
      </>
    } else {
      return text;
    }
  }

  const reset = () => {
    setIdx(0);
    setCheckList(Array(10).fill().map(() => Array(5).fill(false)));
    handleStart();
  }

  if (data.size === 0 || checkList.size === 0) {
    <div>...loading</div>
  }

  return (
    <>
      {data[idx] &&
        <>
          <div className="remain">
            <span >남은 문항 수: {data.length - (idx + 1)}</span>
          </div>
          <div className="quizBlock">
            <span className="question">
              {highlightText(data[idx].question)}
            </span>
            <ul className="options">
              <li className="option">
                <FormControlLabel
                  className="checkbox" control={<Checkbox checked={checkList[idx][0]}
                    onClick={() => handleChange(0)} icon={<OneOutlinedIcon />} checkedIcon={<OneRoundedIcon />}
                  />}
                />
                <span className="contents">
                  {data[idx].answerOptions[0]}
                </span>
              </li>
              <li className="option">
                <FormControlLabel
                  className="checkbox" control={<Checkbox checked={checkList[idx][1]}
                    onClick={() => handleChange(1)} icon={<TwoOutlinedIcon />} checkedIcon={<TwoRoundedIcon />}
                  />}
                />
                <span className="contents">
                  {data[idx].answerOptions[1]}
                </span>
              </li>
              <li className="option">
                <FormControlLabel
                  className="checkbox" control={<Checkbox checked={checkList[idx][2]}
                    onClick={() => handleChange(2)} icon={<ThreeOutlinedIcon />} checkedIcon={<ThreeRoundedIcon />}
                  />}
                />
                <span className="contents">
                  {data[idx].answerOptions[2]}
                </span>
              </li>
              <li className="option">
                <FormControlLabel
                  className="checkbox" control={<Checkbox checked={checkList[idx][3]}
                    onClick={() => handleChange(3)} icon={<FourOutlinedIcon />} checkedIcon={<FourRoundedIcon />}
                  />}
                />
                <span className="contents">
                  {data[idx].answerOptions[3]}
                </span>
              </li>
              <li className="option">
                <FormControlLabel
                  className="checkbox" control={<Checkbox checked={checkList[idx][4]}
                    onClick={() => handleChange(4)} icon={<FiveOutlinedIcon />} checkedIcon={<FiveRoundedIcon />}
                  />}
                />
                <span className="contents">
                  {data[idx].answerOptions[4]}
                </span>
              </li>
            </ul>
            <div className="buttons">
              {idx >= 1 && <GoArrowLeft className="previous" onClick={() => onButtonClick("prev")} />}
              <GoArrowRight className="next" onClick={() => onButtonClick("next")} />
            </div>
          </div>
        </>
      }
      {
        idx === 10 && <QuizResultPage checkList={checkList} reset={reset} />
      }
    </>
  );
}

export default QuizQuestionPage;