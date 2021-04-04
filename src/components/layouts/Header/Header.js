import React from 'react';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

const Kalba__header = styled.div`
background-color: #383E4C;
height: 140px;
@media (min-width: 768px) {
    height: 200px;
}

.kalba__logo__insert {
  display: flex;
  flex-direction: column;
  height: 90px;
  width:100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 150px;
    max-width: 720px;
  }
  @media (max-width: 991px) {
    width: 100%;
    max-width:100%;
    margin: 0;
  }
}
.kalba__logo__insert .logo {
  margin-left: 15px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  text-decoration: none;
  @media (min-width: 768px) {
    margin-left: 20px;
    min-width: 350px;
  }
}

.kalba__logo__insert .logo h1 {
  color: black;
  max-width: 140px;
  font-size: 50px;
  @media (min-width: 768px) {
    max-width: 160px;
  }
}

.kalba__logo__insert .logo p {
  margin-left: 12px;
  margin-top: 24px;
  padding: 8px;
  height: 16px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  background-color: #da292a;
  border-radius: 6px;
  vertical-align: bottom;
}

.kalba__logo__insert .insert {
  float: right;
  width: 100%;
  margin-top: 5px;
  margin-left:10px;
  @media (min-width: 768px) {
    width: auto;
    margin-right: 20px;
  }
}

.kalba__logo__insert .insert .nicknameInsert {
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

.kalba__logo__insert .insert .nicknameInsert input {
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
.kalba__logo__insert .insert .nicknameInsert button {
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

.category {
  height: 50px;
  background-color: rgba(0,0,0,.3);
  font-size: 16px;
}

.category .container {
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.category .container ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.category .container li{
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
}

.category .container span {
  color: #d6d6d6;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    border-bottom: 4px solid #ffffff;
  }
}
`;

const Header = () => {
  return (
    <Kalba__header>
      <div className="kalba__logo__insert">
        <a href="/" className="logo">
          <h1>Kalba</h1>
          <p>칼없는 바바리안</p>
        </a>
        <div className="insert">
          <form className="nicknameInsert">
            <input placeholder="닉네임"></input>
            <button type="submit">
              <MdSearch />
            </button>
          </form>
        </div>
      </div>
      <div className="category">
        <div className="container">
          <ul>
            <li>
              <span>순위표</span>
            </li>
            <li>
              <span>기준표</span>
            </li>
            <li>
              <span>공격력 계산기</span>
            </li>
          </ul>
        </div>
      </div>
    </Kalba__header>
  );
};

export default Header;