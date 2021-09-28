/* React */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

/* Router */
import {NavLink, useHistory} from 'react-router-dom';

/* Styled */
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import axios from "axios";
import {isEmpty} from "../../../../tools/tools";

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
    margin: 7px 0 0;
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

const HeaderInsert = props => {
  const [name, setName] = useState('');
  const history = useHistory();
  const onChange = useCallback(e => {
    setName(e.target.value);

  }, []);

  const {
    className,
  } = props;

  const test = async () => {
      await axios.post(
          '/coc/clan/member/tag', {
              name: name
          }, {
              headers: {
                  "Content-Type": "application/json"
              }
          }).then(res => {
              history.push('/profile/'+res.data.tag.substr(1));
      }).catch(e => {
          alert("이름을 다시 한번 확인해주세요.");
      });
  }
  return (
    <Form className={className}>
      <input
        placeholder="이름 검색"
        value={name}
        onChange={onChange}
      />
        {/*{() => test(name)}*/}
      {/*<NavLink to={`/profile/${tag}`}>*/}
      {/*  <button type="submit">*/}
      {/*    <MdSearch />*/}
      {/*  </button>*/}
      {/*</NavLink>*/}
      <div className="tempButton">
        <MdSearch onClick={test}/>
      </div>
    </Form>
  );
}

HeaderInsert.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

export default HeaderInsert;