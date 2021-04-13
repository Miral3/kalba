import React, { useState, useEffect } from 'react';
import ClanInfo from '../ClanInfo';
import { FaCertificate } from "react-icons/fa";
import trophy from "./cocTrophy.png";
import axios from 'axios';
import './Profile.css'
import { FaRegCopy } from "react-icons/fa";

function translateRole(engTxt) {
  switch (engTxt) {
    case "leader":
      return "대표";
    case "coLeader":
      return "공동대표";
    case "admin":
      return "장로";
    case "member":
      return "멤버";
    default:
      break;
  }
}

function translateLeague(engTxt) {
  let txt = engTxt.split(" ");
  switch (txt[0]) {
    case "Unranked":
      return "랭크되지 않음";
    case "Bronze":
      return "브론즈 리그 " + txt[2];
    case "Silver":
      return "장로";
    case "Gold":
      return "골드 리그 " + txt[2];
    case "Crystal":
      return "크리스털 리그 " + txt[2];
    case "Master":
      return "마스터 리그 " + txt[2];
    case "Champion":
      return "챔피언 리그 " + txt[2];
    case "Titan":
      return "타이탄 리그 " + txt[2];
    case "Legend":
      return "전설 리그";
    default:
      break;
  }
}

function copyTag(txt) {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = txt;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert(txt + "가 클립보드에 복사되었습니다.");
}

const Profile = ({ match }) => {
  const nickname = match.params.category;
  const [usersList, setUsersList] = useState(null);
  const [userData, setUserData] = useState(null);
  const [donaRank, setDonaRank] = useState('');
  const [scoreRank, setScoreRank] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/coc/clan/score/rank", {
          id: "%232Y2Y9YCUU"
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setUsersList(response.data);
        setUserData(response.data.filter(data => data.name === `${nickname}`));
        setScoreRank(response.data.findIndex(i => i.name === `${nickname}`) + 1);
        response.data.sort((a, b) => {
          return b.donations - a.donations
        });
        setDonaRank(response.data.findIndex(i => i.name === `${nickname}`) + 1);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [nickname]);

  if (loading) {
    return <div>대기 중...</div>
  }
  if (!usersList) {
    return null;
  }
  if (!userData.length) {
    return <div>프로필을 찾을 수 없습니다. 이름을 다시 한 번 확인해 주십시오.</div>
  }

  const userInfo = userData[0];
  return (
    <div className="profileBlock">
      <div className="profileContents">
        <div className="userInfo">
          <div className="userNameTagRole">
            <span className="userLevel">
              <i className="icon">
                <FaCertificate />
              </i>
              <span className="level">{userInfo.expLevel}</span>
            </span>
            <ul className="userNameClanInfo">
              <li>
                <span className="userName">{userInfo.name}</span>
              </li>
              <li>
                <span className="userTag">{userInfo.tag}&nbsp;</span>
                <FaRegCopy className="userTagCopy" onClick={() => copyTag(userInfo.tag)} onDoubleClick={() => copyTag(userInfo.tag)} alt="userTagCopy"></FaRegCopy>
              </li>
              <li>
                <span className="userRole">{translateRole(userInfo.role)}</span>
              </li>
            </ul>
          </div>
          <ul className="labels">
            <li className="label">
              <img src={`${userInfo.labels[0].smallIcon}`} alt="label1" />
            </li>
            <li className="label">
              <img src={`${userInfo.labels[1].smallIcon}`} alt="label2" />
            </li>
            <li className="label">
              <img src={`${userInfo.labels[2].smallIcon}`} alt="label3" />
            </li>
          </ul>
        </div>
        <ClanInfo />
        <div className="userScore">
          <div className="currentScore">
            <img
              className="leagueBadge"
              src={`${userInfo.league.iconMedium != null ? userInfo.league.iconMedium : userInfo.league.iconSmall}`}
              alt="leagueBadge"
            />
            <div className="leagueContents">
              <div className="leagueNameBlcok">
                <span className="leagueName">{translateLeague(userInfo.league.name)}</span>
              </div>
              <div className="leagueScore">
                <img className="trophy" src={trophy} alt="trophy" />
                <span className="score">{userInfo.trophies}</span>
              </div>
            </div>
          </div>
          <div className="bestScore">
            <span className="space type">전체 최고 기록:</span>
            <div className="space contents">
              <img className="trophy" src={trophy} alt="trophy" />
              <span>{userInfo.versusTrophies}</span>
            </div>
          </div>
          <div className="warScore">
            <span className="space type">전쟁 별 획득:</span>
            <div className="space contents">
              <span>{userInfo.warStars}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profileRanking">
        <span className="rankingHeader">전체 통계</span>
        <ul className="rankingContents">
          <li className="apRanking">
            <div className="badgeRanking">
              <img className="leagueBadge" src="https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png" alt="leagueBadge" />
              <span className="ranking">#{scoreRank}</span>
            </div>
            <div className="typeAmount">
              <span className="type attackPower">공격력</span>
              <div className="amount">
                <img className="trophy" src={trophy} alt="trophy" />
                <span className="score">{userInfo.yonghaScore}</span>
              </div>
            </div>
          </li>
          <li className="donaRanking">
            <div className="badgeRanking">
              <img className="leagueBadge" src="https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png" alt="leagueBadge" />
              <span className="ranking">#{donaRank}</span>
            </div>
            <div className="typeAmount">
              <span className="type donations">지원량</span>
              <div className="amount">
                <img className="trophy" src={trophy} alt="trophy" />
                <span className="score">{userInfo.donations}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;