/* React */
import React, { useEffect, useState } from 'react';

/* Styled */
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
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
import NumberCheckBox from '../../components/NumberCheckBox/NumberCheckBox';

const QuizQuestionPage = ({ handleStart }) => {
  const [idx, setIdx] = useState(0);
  const [data, setData] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const buttonIcons = [
    {
      icon: <OneOutlinedIcon />,
      checkedIcon: <OneRoundedIcon />,
    },
    {
      icon: <TwoOutlinedIcon />,
      checkedIcon: <TwoRoundedIcon />,
    },
    {
      icon: <ThreeOutlinedIcon />,
      checkedIcon: <ThreeRoundedIcon />,
    },
    {
      icon: <FourOutlinedIcon />,
      checkedIcon: <FourRoundedIcon />,
    },
    {
      icon: <FiveOutlinedIcon />,
      checkedIcon: <FiveRoundedIcon />,
    },
  ];


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
          <span className='underline bold' key={txt.toString()}>{txt}</span> :
          <span key={txt.toString()}>{boldText(txt)}</span>))}
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
          <span className='bold' key={txt.toString()}>{txt}</span> :
          <span key={txt.toString()}>{txt}</span>))}
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
            <div className="question">
              {highlightText(data[idx].question)}
            </div>
            <ul className="options">
              {buttonIcons.map((icon, num) => (
                <li className="option" key={num}>
                  <NumberCheckBox className='checkbox' handleChange={handleChange} num={num} icon={icon} checked={checkList[idx][num]} />
                  <span className="contents">
                    {data[idx].answerOptions[num]}
                  </span>
                </li>
              ))}
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