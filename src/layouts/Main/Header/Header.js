/* React */
import React, { useState } from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import HeaderNav from './HeaderNav';
import HeaderInsert from './HeaderInsert';
import axios from "axios";
import { getLoginToken } from "../../../tools/tools";

const HeaderBlock = styled.div`
  a {
    text-decoration: none !important;
    &:link {
    color: black;
    text-decoration: none;
    }
    &:visited {
    color: black;
    text-decoration: none;
    }
  }
  background-color: #383e4c;
  height: 150px;
  @media (min-width: 768px) {
    height: 200px;
  }
  .kalba__logo__insert {
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
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
      max-width: 100%;
      margin: 0;
    }
  }
  .kalba__logo__insert .logo {
    margin: 10px 0 10px 15px;
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
    color: white;
    max-width: 140px;
    font-size: 35px;
    font-family: "supercell+NotoSansKR";
    @media (min-width: 768px) {
      max-width: 160px;
    }
  }
  .kalba__logo__insert .logo p {
    margin-left: 12px;
    margin-top: 24px;
    padding: 8px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    background-color: #da292a;
    border-radius: 6px;
    vertical-align: bottom;
  }
  .category {
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 16px;
  }
  .insert {
    float: right;
    width: auto;
    margin-left: 10px;
    margin-right: 3rem;
    @media (min-width: 768px) {
      width: auto;
      margin-right: 20px;
    }
  }
  .login {
    position: absolute;
    top: 20px;
    right: 10px;
  }
`;

const Header = ({ children }) => {
  const [admin, setAdmin] = useState(false);

  const userItems = [
    { label: "순위표", href: "/leaderboards/donations" },
    { label: "기준표", href: "/standardTable/heroes" },
    { label: "퀴즈", href: "/Quiz" },
  ];

  const adminItems = [
    { label: "순위표", href: "/leaderboards/donations" },
    { label: "기준표", href: "/standardTable/heroes" },
    { label: "퀴즈", href: "/Quiz" },
    { label: "관리자페이지", href: "/admin" },
  ];

  const isAdmin = async () => {
    await axios.get(
      '/account/admin', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getLoginToken()}`
      }
    }).then(res => {
      if (res.status === 200) {
        setAdmin(true);
      }
    });
  }

  isAdmin();
  return (
    <HeaderBlock>
      <div className="kalba__logo__insert">
        <a href="/" className="logo">
          <h1>Kalba</h1>
          <p>칼없는 바바리안</p>
        </a>
        <div className="insert">
          <HeaderInsert />
        </div>
      </div>
      <div className="login">
        {children}
      </div>
      <div className="category">
        < HeaderNav items={admin ? adminItems : userItems} />
      </div>
    </HeaderBlock>
  );
}

export default Header;