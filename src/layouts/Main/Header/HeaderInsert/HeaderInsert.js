/* React */
import React, { useCallback, useState } from 'react';

/* Styled */
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

const Form = styled.form`
  position: relative;
  width: 100%;
  border: 1px solid #ffffff;
  border-radius: 4px;
  background-color: #ffffff;
  margin-left: 20px;
  padding-right: 35px;
  margin: 0;
  @media (min-width: 768px) {
    width: 274px;
    /* margin: 7px 0 0; */
  }
  input {
  background-color: #ffffff;
  font-size: 12px;
  border: 0;
  padding: 5px 7px;
  line-height: 20px;
  margin-left: 5px;
  width: 100%;
  &:focus {
    outline: none;
  }
}
  button {
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
  .tempButton {
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
`;

const HeaderInsert = ({ onInsert }) => {
  const [name, setName] = useState('');

  const onChange = useCallback(e => {
    setName(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(name);
      setName('');
      e.preventDefault();
    },
    [onInsert, name],
  );

  return (
    <Form className="form" onSubmit={onSubmit}>
      <input
        placeholder="이름 검색"
        value={name}
        onChange={onChange}
      />
      <div className="tempButton">
        <MdSearch onClick={onSubmit} />
      </div>
    </Form>
  );
}

export default HeaderInsert;