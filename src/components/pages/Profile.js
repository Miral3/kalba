import React, { useState, useEffect } from 'react';
import ClanInfo from '../ClanInfo';
import { FaCertificate } from "react-icons/fa";
import trophy from "./cocTrophy.png";
import axios from 'axios';
import './Profile.css'




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
    return <div>프로필을 찾을 수 없습니다. 닉네임을 다시 한 번 확인해 주십시오.</div>
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
                <span className="userTag">{userInfo.tag}</span>
              </li>
              <li>
                <span className="userRole">{userInfo.role}</span>
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
              src={`${userInfo.league.iconMedium}`}
              alt="leagueBadge"
            />
            <div className="leagueContents">
              <div className="leagueNameBlcok">
                <span className="leagueName">{userInfo.league.name}</span>
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
    </div>
  );
};

export default Profile;