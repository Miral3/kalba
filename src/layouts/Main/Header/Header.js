/* React */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    /* margin-top: 24px; */
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
  .login {
    position: absolute;
    top: 15px;
    right: 10px;
  }
`;

const Header = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState();
  const [tag, setTag] = useState();
  const [results, setResults] = useState([]);
  const history = useHistory();
  const token = getLoginToken();

  const userItems = [
    { label: "?????????", href: "/leaderboards/donations" },
    { label: "?????????", href: "/standardTable/heroes" },
    { label: "??????", href: "/Quiz" },
  ];

  const adminItems = [
    { label: "?????????", href: "/leaderboards/donations" },
    { label: "?????????", href: "/standardTable/heroes" },
    { label: "??????", href: "/Quiz" },
    { label: "??????????????????", href: "/admin/management" },
  ];

  const onInsert = async () => {
    try {
      const response = await axios.post(
        '/coc/clan/member/name', {
        tag: tag
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        history.push('/profile/' + tag.substr(1));
      }
      else if (response.status === 204) {
        alert("????????? ?????? ?????? ??????????????????.");
        return;
      }
    } catch (err) {
      alert("???????????? ?????? ????????? ?????????????????????. ?????? ?????? ??????????????????.");
      return;
    }
  }

  const updateField = (field, value, update = true) => {
    if (update) {
      onSearch(value);
    }
    if (field === 'keyword') {
      setKeyword(value);
    }
    if (field === 'tag') {
      setTag(value);
    }
    if (field === 'results') {
      setResults(value);
    }
  };

  const onSearch = text => {
    const results = data.filter(item => true === matchName(item.name, text));
    setResults({ results });
  };

  const matchName = (name, keyword) => {
    name = name.toLowerCase();
    if (keyword === '') {
      return false;
    }

    return name.includes(keyword.toString().toLowerCase());
  }

  useEffect(() => {
    const isAdmin = async () => {
      await axios.get(
        '/account/admin', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(res => {
        if (res.status === 200) {
          setAdmin(true);
        }
      });
    }
    isAdmin();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `/coc/clan/rank`, {
          tag: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <HeaderBlock>
      <div className="kalba__logo__insert">
        <div className="logo">
          <a href="/"><h1>Kalba</h1></a>
          <p>????????? ????????????</p>
        </div>
        <HeaderInsert
          onInsert={onInsert}
          keyword={keyword}
          results={results}
          updateField={updateField}
        />
      </div>
      <div className="login">
        {children}
      </div>
      <div className="category">
        <HeaderNav items={admin ? adminItems : userItems} />
      </div>
    </HeaderBlock>
  );
}

export default Header;