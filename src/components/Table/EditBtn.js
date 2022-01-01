import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;  
  justify-content: center;
  width:100%;
  
  .buttonWrap {
    width: 100%;
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
    button {
      background-color: #fff;
      border: 1px solid #DDDBE7;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
      color: #505050;
      font-weight: 600;
    }
    .editBtn {
      float:right;
      &:hover {
        border: 1px solid  #4ade80;
        color:  #4ade80;
      }
    }
    .cancelBtn  {
      float:right;
      &:hover {
        border: 1px solid  #ef4444;
        color:  #ef4444;
      }
    }
    .addBtn {
      float: left;
      &:hover {
        border: 1px solid #fb923c;
        color: #fb923c;
      }
    }
    .saveBtn {
      float:right;
      margin-right: 1rem;
      &:hover {
        border: 1px solid #60a5fa; 
        color: #60a5fa;
      }
    }
  }
`;

const EditBtn = ({ handleEditMode, editMode, handleSave, addRow, handleEditCancel }) => {

  const handleClick = (type) => {
    if (type !== 'add') {
      handleEditMode();
    }
    if (type === 'save') {
      handleSave();
    }
    if (type === 'add') {
      addRow();
    }
    if (type === 'cancel') {
      handleEditCancel();
    }
  }

  return (
    <Container>
      <div className="buttonWrap">
        {!editMode && <button className="editBtn" onClick={() => handleClick('edit')}>수정</button>}
        {editMode &&
          <>
            <button className="addBtn" onClick={() => handleClick('add')}>추가</button>
            <button className="cancelBtn" onClick={() => handleClick('cancel')}>취소</button>
            <button className="saveBtn" onClick={() => handleClick('save')}>저장</button>
          </>
        }
      </div>
    </Container>
  )
}

export default EditBtn;