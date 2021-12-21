import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { getLoginUserNickname, isEmpty, getLoginUserTag, copyText, logout, getLoginUserRole, getLoginUserYonghaScore } from "../tools/tools";
import { LogoutButton } from "../components/Button";

import styled from 'styled-components';
import { FaRegCopy } from "react-icons/fa";

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: -10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColors.accountInfo};
  border: ${({ theme }) => theme.borderColors.accountInfo};
  width: 300px;
  height: 285px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-bottom: ${({ theme }) => theme.borderColors.accountInfoBottom};
    padding-bottom: 15px;
    span {
      color: ${({ theme }) => theme.fontColors.accountInfo};
      font-weight: 600;
    }
    .leagueBadge {
      width: 100px;
      padding: 15px 0;
    }

    .leagueBadge, 
    .nickname {
      cursor: pointer;
    }
    .nickname {
      &:hover {
        border-bottom: ${({ theme }) => theme.borderColors.listName};
      }
    }
    .contents {
      padding-bottom: 3px;
    }
    .userTagBtn {
      padding-top: 15px;
    }
    .userTagCopy {
      top: 0;
      right: -5px;
      color: #7dd3fc;
      cursor: pointer;
    }
  }
  .btnBlock {
    padding: 20px 33px;
  }
`
const Blank = styled.div`
  height: 130px;
`

const AccountInfo = () => {
  const userTag = getLoginUserTag();
  const history = useHistory();
  const linkTag = getLoginUserTag().substr(1);
  const [leagueBadge, setLeagueBadge] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "/coc/clan/member/badge", {
          tag: userTag
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setLeagueBadge(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [userTag]);

  const moveProfilePage = () => {
    history.push(`/profile/${linkTag}`);
  }

  return (
    <Container>
      <div className="userInfo">
        {isEmpty(leagueBadge) ? <Blank></Blank> : <img className="leagueBadge" src={leagueBadge.badge} onClick={() => moveProfilePage()} alt="leagueBadge" title="프로필로 이동" />}
        <span className="nickname contents" onClick={() => moveProfilePage()} title="프로필로 이동">{getLoginUserNickname()}</span>
        <span className="role yonghaScore contents">{getLoginUserRole()} (공{getLoginUserYonghaScore()})</span>
        <div className="userTagBtn contents">
          <span className="tag">{userTag}</span>
          <FaRegCopy className="userTagCopy" onClick={() => copyText(getLoginUserTag())} />
        </div>
      </div>
      <div className="btnBlock">
        <LogoutButton children="로그아웃" onClick={logout} />
      </div>
    </Container>
  );
}

export default AccountInfo;