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
    
    .editBtn,
    .cancelBtn  {
      float:right;
    }
    .addBtn {
      float: left;
    }
    .saveBtn {
      float:right;
      margin-right: 1rem;
    }
  }
`;

const EditBtn = ({ handleEditMode, editMode, handleSave, addRow, editCancel }) => {

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
      editCancel();
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