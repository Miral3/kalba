
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
    .head {
      font-family: "cocOpen";
      font-size: 50px;
      margin-bottom: 150px;
      @media(max-width: 500px) {
        font-size: 45px;
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