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
  display: flex;
  flex-direction: column;

  .closeBtn {
    cursor: pointer;
  }
`
const Modal = ({ selectedData, handleCancel, handleSubmit, onSaveData }) => {
  const [edited, setEdited] = useState(selectedData);

  const [form, setForm] = useState(
    {
      englishName: '',
      index: '',
      korean: '',
      maxScore: '',
      maxLevel: '',
      value: '',
    });

  // const handleChange = (e) => {
  //   const {english} = e.target;
  //   const {name, value} = e.target;
  //   form.push([english, {
  //       [name]: value,
  //     }]);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  };

  const onCancel = () => {
    handleCancel();
  }

  // const onEditChange = (e) => {
  //   setEdited({
  //     ...edited,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
  }

  return (
    <Container>
      {/* <div className={open ? "cover active" : "cover"}> */}
      <div className="cover active">
        <FormContainer>
          <div className="header">
            <h3>데이터 추가하기</h3>
            <MdClose onClick={onCancel} className="closeBtn" />
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <label>
                영어이름
                <input
                  placeholder='영어이름을 입력해주세요'
                  type='text'
                  name='englishName'
                  value={form.englishName}
                  onChange={handleChange}
                />
              </label>
              <label>
                순서
                <input
                  placeholder='순서를 입력해주세요'
                  type='text'
                  name='index'
                  value={form.index}
                  onChange={handleChange}
                />
              </label>
              <label>
                한국이름
                <input
                  placeholder='한국이름을 입력해주세요'
                  type='text'
                  name='korean'
                  value={form.korean}
                  onChange={handleChange}
                />
              </label>
              <label>
                최대 점수
                <input
                  placeholder='최대점수를 입력해주세요'
                  type='text'
                  name='maxScore'
                  value={form.maxScore}
                  onChange={handleChange}
                />
              </label>
              <label>
                최대 레벨
                <input
                  placeholder='최대레벨을 입력해주세요'
                  type='text'
                  name='maxLevel'
                  value={form.maxLevel}
                  onChange={handleChange}
                />
              </label>
              <label>
                비례 점수
                <input
                  placeholder='비례점수를 입력해주세요'
                  type='text'
                  name='value'
                  value={form.value}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <button type='submit'>저장</button>
            </div>
          </form>
        </FormContainer>
      </div>
    </Container>
  );
}

export default Modal;