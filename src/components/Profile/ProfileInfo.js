import React, { useState, useEffect } from 'react';

import './Profile.css'
import styled from 'styled-components';
import { FaRegCopy } from "react-icons/fa";

import axios from 'axios';
import ClanInfo from '../ClanInfo';
import { heroesInfo, petsInfo, troopsInfo, spellsInfo, siegeMachinesInfo, heroesSrcPath, petsSrcPath, troopsSrcPath, spellsSrcPath, siegeMachinesSrcPath } from './data';
import { isEmpty, translateRole, copyText } from '../../tools/tools';

const Army = styled.div`
  display: flex;
  justify-content: space-around;
  background: linear-gradient(to top, #6d779a, #8c96ae);
  border-radius: 8px;
  border: 3px solid #6a7497;
  margin-top: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  img:not(.townHall) {
  width: 40px;
  height: 40px;
  background-color: #9496c8;
  border: 2px solid #49485f;
  border-radius: 5px;
  grid-row: 1/1;
  grid-column: 1/1;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  ul li {
    padding-right: 3px;
    display: inline-grid;
  }
  .level, .maxLevel{
    width: 17px;
    height: 15px;
    grid-row: 1/1;
    grid-column: 1/1;
    margin-top: 24px;
    margin-left: 3px;
    background-color: black;
    border: 1px solid #fff;
    border-radius: 3px;
    color: white;
    font-size: 10px;
    text-shadow: 0px 2px 0px black;
    text-align: center;
  }
  .maxLevel {
    background-color: #e5c133;
  }
  .block {
    background-color: #616b8a;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
  }
  .type {
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    text-shadow: -1px 0 black, 0 2px black, 1px 0 black, 0 -1px black;
  }
  .townHallBlock {
    display: flex;
    justify-content: center;
  }
  .townHall {
    width: 150px;
    height: 161px;
    margin: 28px 0;
  }
  .troops, .spells, .siegeMachines {
    @media (min-width: 769px) {
      width: 440px;
    }
  }
`
const Img = styled.img`
  -webkit-filter: ${props => props.isLoaded ? 'grayscale(0%)' : 'grayscale(100%)'};
  filter: ${props => props.isLoaded ? 'none' : 'gray'};
`

const translateLeague = (engTxt) => {
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

const getIdxMap = (userInfo) => {
  let idxMap = new Map();
  for (let i = 0; i < userInfo.heroes.length; i++) {
    if (userInfo.heroes[i].village === 'home') {
      idxMap.set(userInfo.heroes[i].name, i);
    }
  }
  for (let i = 0; i < userInfo.spells.length; i++) {
    if (userInfo.spells[i].village === 'home') {
      idxMap.set(userInfo.spells[i].name, i);
    }
  }
  for (let i = 0; i < userInfo.troops.length; i++) {
    if (userInfo.troops[i].village === 'home') {
      idxMap.set(userInfo.troops[i].name, i);
    }
  }
  return idxMap;
}

const ProfileInfo = ({ match }) => {
  const name = match;
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
        setUserData(response.data.filter(data => data.name === `${name}`));
        setScoreRank(response.data.findIndex(i => i.name === `${name}`) + 1);
        response.data.sort((a, b) => {
          return b.donations - a.donations
        });
        setDonaRank(response.data.findIndex(i => i.name === `${name}`) + 1);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [name]);

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
  const idxMap = getIdxMap(userInfo);
  const preCheck = (input) => {
    return isEmpty(input) ? ""
      : input.level === input.maxLevel ?
        <div className="maxLevel">{input.level}</div> :
        <div className="level">{input.level}</div>
  }
  const townHallCheck = (hallLevel, weaponLevel) => {
    return isEmpty(weaponLevel) ? <img className="townHall" src={`/COC/coc_TownHall/Town_Hall${hallLevel}.png`} alt="townHall" /> :
      <img className="townHall" src={`/COC/coc_TownHall/Town_Hall${hallLevel}-${weaponLevel}.png`} alt="townHall" />
  }
  return (
    <div className="profileBlock">
      <div className="profileContents">
        <div className="userInfo">
          <div className="userNameTagRole">
            <span className="userLevel">
              <img className="icon" src="/COC/user-level.png" alt="level" />
              <span className="level">{userInfo.expLevel}</span>
            </span>
            <ul className="userNameClanInfo">
              <li>
                <span className="userName">{userInfo.name}</span>
                <img
                  className="leagueBadge"
                  src={`${userInfo.league.iconMedium != null ? userInfo.league.iconMedium : userInfo.league.iconSmall}`}
                  alt="leagueBadge"
                />
              </li>
              <li>
                <span className="userTag">{userInfo.tag}&nbsp;</span>
                <FaRegCopy
                  className="userTagCopy"
                  onClick={() => copyText(userInfo.tag)}
                  onDoubleClick={() => copyText(userInfo.tag)}
                  alt="userTagCopy"
                />
              </li>
              <li>
                <span className="userRole">{translateRole(userInfo.role)}</span>
              </li>
            </ul>
          </div>
          <ul className="labels">
            {userInfo.labels.map((arr, idx) =>
              <li className="label" key={idx}>
                <img src={`${userInfo.labels[idx].smallIcon}`} alt="label" />
              </li>
            )}
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
              <div className="leagueNameBlock">
                <span className="leagueName">{translateLeague(userInfo.league.name)}</span>
              </div>
              <div className="leagueScore">
                <img className="trophy" src="/COC/cocTrophy.png" alt="trophy" />
                <span className="score">{userInfo.trophies}</span>
              </div>
            </div>
          </div>
          <div className="bestScore">
            <span className="space type">전체 최고 기록:</span>
            <div className="space contents">
              <img className="trophy" src="/COC/cocTrophy.png" alt="trophy" />
              <span className="score">{userInfo.versusTrophies}</span>
            </div>
          </div>
          <div className="warScore">
            <span className="space type">전쟁 별 획득:</span>
            <div className="space contents">
              <img className="warStar" src="/COC/war-star.png" alt="warStar" />
              <span className="score">{userInfo.warStars}</span>
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
                <img className="trophy" src="/COC/cocTrophy.png" alt="trophy" />
                <div className="scoreDiv">
                  <span className="score">{userInfo.yonghaScore}</span>
                </div>
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
                <img className="trophy" src="/COC/cocTrophy.png" alt="trophy" />
                <div className="scoreDiv">
                  <span className="score">{userInfo.donations}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Army className="army">
        <div className="contents">
          <div className="townHallBlock">
            {townHallCheck(userInfo.townHallLevel, userInfo.townHallWeaponLevel)}
          </div>
          <div className="heroes block">
            <span className="type">영웅</span>
            <ul className="first">
              {heroesInfo.map((info, index) => (
                <li key={index}>
                  <Img isLoaded={!isEmpty(userInfo.heroes[idxMap.get(info.name)])} className={info.className} src={heroesSrcPath + info.source} alt={info.className} />
                  {preCheck(userInfo.heroes[idxMap.get(info.name)])}
                </li>
              ))}
            </ul>
          </div>
          <div className="pets block">
            <span className="type">펫</span>
            <ul className="first">
              {petsInfo.map((info, index) => (
                <li key={index}>
                  <Img isLoaded={!isEmpty(userInfo.troops[idxMap.get(info.name)])} className={info.className} src={petsSrcPath + info.source} alt={info.className} />
                  {preCheck(userInfo.troops[idxMap.get(info.name)])}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contents">
          <div className="troops block">
            <span className="type">병력</span>
            <ul className="first">
              {troopsInfo.map((info, index) => (
                <li key={index}>
                  <Img isLoaded={!isEmpty(userInfo.troops[idxMap.get(info.name)])} className={info.className} src={troopsSrcPath + info.source} alt={info.className} />
                  {preCheck(userInfo.troops[idxMap.get(info.name)])}
                </li>
              ))}
            </ul>
          </div>
          <div className="spells block">
            <span className="type">마법</span>
            <ul className="first">
              {spellsInfo.map((info, index) => (
                <li key={index}>
                  <Img isLoaded={!isEmpty(userInfo.spells[idxMap.get(info.name)])} className={info.className} src={spellsSrcPath + info.source} alt={info.className} />
                  {preCheck(userInfo.spells[idxMap.get(info.name)])}
                </li>
              ))}
            </ul>
          </div>
          <div className="siegeMachines block">
            <span className="type">시즈 머신</span>
            <ul className="first">
              {siegeMachinesInfo.map((info, index) => (
                <li key={index}>
                  <Img isLoaded={!isEmpty(userInfo.troops[idxMap.get(info.name)])} className={info.className} src={siegeMachinesSrcPath + info.source} alt={info.className} />
                  {preCheck(userInfo.troops[idxMap.get(info.name)])}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Army>
    </div>
  );
};

export default ProfileInfo;