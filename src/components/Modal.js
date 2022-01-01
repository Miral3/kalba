import React, { useState } from 'react';

import styled from 'styled-components';
import { MdClose } from "react-icons/md";

const Container = styled.div`
  .cover {
    width:100%;
    z-index: 3;
    position: fixed;
    inset: 0px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-out 0s, visibility 0.3s ease-out 0s;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .cover.active {
    opacity: 1;
    visibility: visible;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 212px;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
    padding: 10px;
    .headerTitle {
      font-size: 20px;
      font-weight: 700;
    }
    .closeBtn {
      cursor: pointer;
      font-size: 25px;
    }
  }

  form {  
    .inputSection {
      padding: 10px;
      border-bottom: 1px solid #d6d6d6;
      .input + .input {
        margin-top: 4px;
      }
      input {
        margin-left: 3px;
      }
    }
    .footer {
      .submitBtn {
        margin: 10px;
        float: right;
        background-color: #fff;
        border: 1px solid #DDDBE7;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        color: #505050;
        font-weight: 600;
        &:hover {
          border: 1px solid #60a5fa; 
          color: #60a5fa;
        }
      }
    }
  }
`
const Modal = ({ handleModal, handleSubmit }) => {
  const [form, setForm] = useState(
    {
      englishName: '',
      korean: '',
      maxScore: '',
      maxLevel: '',
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  const onCancel = () => {
    handleModal();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
  }

  return (
    <Container>
      <div className="cover active">
        <FormContainer>
          <div className="header">
            <span className="headerTitle">데이터 추가하기</span>
            <MdClose onClick={onCancel} className="closeBtn" />
          </div>
          <form onSubmit={onSubmit}>
            <div className="inputSection">
              <div className="input">
                영어 이름:
                <input
                  placeholder='영어이름을 입력해주세요'
                  type='text'
                  name='englishName'
                  value={form.englishName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                한국 이름:
                <input
                  placeholder='한국이름을 입력해주세요'
                  type='text'
                  name='korean'
                  value={form.korean}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                최대 점수:
                <input
                  placeholder='최대점수를 입력해주세요'
                  type='text'
                  name='maxScore'
                  value={form.maxScore}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                최대 레벨:
                <input
                  placeholder='최대레벨을 입력해주세요'
                  type='text'
                  name='maxLevel'
                  value={form.maxLevel}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="footer">
              <button className="submitBtn" type='submit'>저장</button>
            </div>
          </form>
        </FormContainer>
      </div>
    </Container>
  );
}

export default Modal;