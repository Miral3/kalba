
/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  height: 600px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 0 10px 2px rgba(100, 100, 100, 0.1);
  border-radius: 20px;
  padding: 20px;
  width: 600px;
  height: 380px;
  word-break: keep-all;
  font-family: "cocLight";
  @media (max-width: 600px) {
    width: 100%;
    height: 450px;
  }
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
    .head {
      font-family: "cocOpen";
      font-size: 50px;
      margin-top: 30px;
      margin-bottom: 110px;
      @media (max-width: 600px) {
        font-size: 45px;
        margin-bottom: 180px;
      }
    }
    .body {
      font-size: 1.5rem;
      padding-bottom: 5px;
    }
    .button {
      display:flex;
      align-items: center;
      .startBtn {
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
      width: 100%;
      height: 52px;
      font-family: "cocOpen";
      font-size: 20px;
      .underline {
        text-decoration: underline;
      }
      .bold {
        font-weight: 700 !important;
      }
    }
    .options {
      width: 100%;
      height: 180px;
      margin: 0;
      @media (max-width: 600px) {
        height: 250px;
      }
      .option {
        display: flex;
        align-items: flex-start;
        margin-top: 8px;
        .contents{
          margin-top: 3px;
        }
      }
    }
    .buttons {
      color: #383E4C;
      .previous,
      .next {
        font-size: 50px;
        cursor: pointer;
      }
      .next {
        float: right;
      }
    }
  }
  .resultBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 240px;
      .thanks {
        font-size: 2rem;
      }
      .name, .score {
        font-size: 1.5rem;
      }
    }
    .buttonBlock {
      width: 100%;
      display: flex;
      justify-content: center;
      .button {
        width: 82px;
        background-color: #383E4C;
        color: #fff;
        padding: 5px;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 700;
        margin: 0 5px;
      }
    }
    .result {
      width: 100%;
      height: 240px;
      display: flex;
      font-size: 30px;
      .left,
      .right {
        li {
          width: 80px;
        }
        text-align: right;
        width: 100%;
      }
    }
  }
  .questioner {
      text-align: right;
    }
`;

const QuizWrapper = ({ children }) => {
  return (
    <Container>
      <Contents>
        {children}
      </Contents>
    </Container>
  );
}

export default QuizWrapper;