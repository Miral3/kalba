import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import axios from 'axios';

const Container = styled.div`
  display: block;
  height: auto !important;
  margin-top: 1rem !important;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 3rem;
  position: relative !important;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  .block .blockHead {
    /* 블록헤드 스크롤바 따라오기 */
    position: sticky;
    top:0;

    display:flex;
    justify-content:space-around;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-weight: 400;
    padding: 12px 0;
    text-align: center;
    font-size: 13px;
    .rank {
      display: table-cell;
      width:10%;
      padding-left:3px;
      @media (max-width: 425px) {
        display: none;
      }
    }
    .name {
      text-align:left;
      /* width: 45%; */
      width: 60%;
      padding-left: 16px;
    }
    .trophies,
    .townHallLevel,
    .donations,
    .attackPower {
      width: 15%;
      padding-right:3px;
    }
  }
`;

const UserList = ({ category }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'score' ? 'score' : `${category}`;
        const response = await axios.post(
          `/coc/clan/${query}/rank`, {
          id: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <Container>대기 중...</Container>
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <Container>
        <div className="block">
          <div className="blockHead">
            <span className="rank">#</span>
            <span className="name">이름</span>
            <span className="trophies">트로피</span>
            <span className="townHallLevel">홀</span>
            <span className="attackPower">공격력</span>
            <span className="donations">지원량</span>
          </div>
          {data.map((data, idx) => (
            <UserInfo key={data.tag} idx={idx + 1} info={data} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UserList;