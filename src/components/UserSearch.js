import React, { useState, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

const Insert = styled.div`
.insert {
  float: right;
  margin-top: 5px;
  margin-left:10px;
  @media (min-width: 768px) {
    width: auto;
    margin-right: 20px;
  }
}

.insert .nicknameInsert {
  position: relative;
  width: 100%;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: #ffffff;
  margin-right: 0;
  @media (min-width: 475px) {
    width: 274px;
  }
  @media (min-width: 768px) {
    width: 274px;
    margin: 7px 0 0;
  }
}

.insert .nicknameInsert input {
  background-color: #ffffff;
  font-size: 12px;
  border: 0;
  padding: 5px 7px;
  line-height: 20px;
  margin-left: 5px;
  width: auto;
  &:focus {
    outline: none;
  }
}
.insert .nicknameInsert button {
  position: absolute;
  top: 8px;
  right: 5px;
  border: none;
  font-size: 18px;
  text-align: center;
  color: #ff4500;
  background-color: #ffffff;
  outline: none;
  padding: 0;
  cursor: pointer;
}
`
const UserSearch = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value],
  );
  const moveHref = () => {
    document.location.href = "/profile"
  }
  return (
    <Insert>
      <div className="insert">
        <form className="nicknameInsert" onSubmit={onSubmit}>
          <input
            placeholder="닉네임"
            value={value}
            onChange={onChange}
          />
          <button type="submit" onClick={moveHref}>
            <MdSearch />
          </button>
        </form>
      </div>
    </Insert>
  );
};

export default UserSearch;