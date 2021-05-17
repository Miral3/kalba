import React, { useState, useEffect } from 'react';

import './Profile.css'
import styled from 'styled-components';
import { FaCertificate } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import trophy from "./cocTrophy.png";
import ClanInfo from '../ClanInfo';
import axios from 'axios';
import { isEmpty, translateRole } from '../../tools/tools';

const Army = styled.div`
  display: flex;
  justify-content: space-around;
  background: linear-gradient(to top, #6d779a, #8c96ae);
  border-radius: 8px;
  border: 3px solid #6a7497;
  margin-top: 15px;
  img:not(.townHall) {
  width: 40px;
  height: auto;
  background-color: #9496c8;
  border: 2px solid #49485f;
  border-radius: 5px;
  grid-row: 1/1;
  grid-column: 1/1;
  }
ul {
  display: flex;
  padding: 0;
  margin: 0;
}
ul li {
  padding-right: 5px;
  display: inline-grid;
}
.level {
  width: 15px;
  height: 13px;
  grid-row: 1/1;
  grid-column: 1/1;
  margin-top: 27px;
  margin-left: 3px;
  background-color: black;
  border-radius: 3px;
  color: white;
  font-size: 3px;
  font-weight: 700;
  text-align: center;
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
  text-shadow: 1px 2px 1px black;
}
.townHallBlock {
  display: flex;
  justify-content: center;
}
.townHall {
  width: 150px;
  margin: 7px 0;
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

const copyTag = (txt) => {
  let t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = txt;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  alert(txt + "가 클립보드에 복사되었습니다.");
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

  const preCheck = (input) => {
    return isEmpty(input) ? ""
      : <div className="level">{input.level}</div>;
  }
  console.log(userInfo);

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
                  onClick={() => copyTag(userInfo.tag)}
                  onDoubleClick={() => copyTag(userInfo.tag)}
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
      <Army>
        <div className="contents">
          <div className="townHallBlock">
            <img className="townHall" src="/COC/coc_TownHall/Town_Hall14-5.png" alt="townHall" />
          </div>
          <div className="heroes block">
            <span className="type">영웅</span>
            <ul className="first">
              <li>
                <Img isLoaded={!isEmpty(userInfo.heroes[0])} className="king" src="/COC/coc_Heroes/Barbarian_King.png" alt="king" />
                {preCheck(userInfo.heroes[0])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.heroes[1])} className="queen" src="/COC/coc_Heroes/Archer_Queen.png" alt="queen" />
                {preCheck(userInfo.heroes[1])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.heroes[2])} className="warden" src="/COC/coc_Heroes/Grand_Warden.png" alt="warden" />
                {preCheck(userInfo.heroes[2])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.heroes[3])} className="rochamp" src="/COC/coc_Heroes/Royal_Champion.png" alt="rochamp" />
                {preCheck(userInfo.heroes[3])}
              </li>
            </ul>
          </div>
          <div className="pets block">
            <span className="type">펫</span>
            <ul className="first">
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[50])} className="lassi" src="/COC/coc_Pets/L.A.S.S.I.png" alt="lassi" />
                {preCheck(userInfo.troops[50])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[52])} className="owl" src="/COC/coc_Pets/Electro_Owl.png" alt="owl" />
                {preCheck(userInfo.troops[52])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[51])} className="yak" src="/COC/coc_Pets/Mighty_Yak.png" alt="yak" />
                {preCheck(userInfo.troops[51])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[53])} className="unicorn" src="/COC/coc_Pets/Unicorn.png" alt="unicorn" />
                {preCheck(userInfo.troops[53])}
              </li>
            </ul>
          </div>
        </div>
        <div className="contents">
          <div className="troops block">
            <span className="type">병력</span>
            <ul className="first">
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[0])} className="barbarian" src="/COC/coc_Troops/Barbarian.png" alt="barbarian" />
                {preCheck(userInfo.troops[0])}
              </li>
              <li>
                <Img isLoaded={!isEmpty(userInfo.troops[1])} className="archer" src="/COC/coc_Troops/Archer.png" alt="archer" />
                {preCheck(userInfo.troops[1])}
              </li>
              <li>
                <img className="giant" src="/COC/coc_Troops/Giant.png" alt="giant" />
              </li>
              <li>
                <img className="goblin" src="/COC/coc_Troops/Goblin.png" alt="goblin" />
              </li>
              <li>
                <img className="wallBreaker" src="/COC/coc_Troops/Wall_Breaker.png" alt="wallBreaker" />
              </li>
              <li>
                <img className="balloon" src="/COC/coc_Troops/Balloon.png" alt="balloon" />
              </li>
              <li>
                <img className="wizard" src="/COC/coc_Troops/Wizard.png" alt="wizard" />
              </li>
              <li>
                <img className="healer" src="/COC/coc_Troops/Healer.png" alt="healer" />
              </li>
              <li>
                <img className="dragon" src="/COC/coc_Troops/Dragon.png" alt="dragon" />
              </li>
            </ul>
            <ul className="second">
              <li><img className="pekka" src="/COC/coc_Troops/P.E.K.K.A.png" alt="pekka" /></li>
              <li><img className="babyDragon" src="/COC/coc_Troops/Baby_Dragon.png" alt="babyDragon" /></li>
              <li><img className="miner" src="/COC/coc_Troops/Miner.png" alt="miner" /></li>
              <li><img className="electroDragon" src="/COC/coc_Troops/Electro_Dragon.png" alt="electroDragon" /></li>
              <li><img className="yeti" src="/COC/coc_Troops/Yeti.png" alt="yeti" /></li>
              <li><img className="minion" src="/COC/coc_Troops/Minion.png" alt="minion" /></li>
              <li><img className="hogRider" src="/COC/coc_Troops/Hog_Rider.png" alt="hogRider" /></li>
              <li><img className="valkyrie" src="/COC/coc_Troops/Valkyrie.png" alt="valkyrie" /></li>
              <li><img className="golem" src="/COC/coc_Troops/Golem.png" alt="golem" /></li>
            </ul>
            <ul className="third">
              <li><img className="witch" src="/COC/coc_Troops/Witch.png" alt="witch" /></li>
              <li><img className="lavaHound" src="/COC/coc_Troops/Lava_Hound.png" alt="lavaHound" /></li>
              <li><img className="bowler" src="/COC/coc_Troops/Bowler.png" alt="bowler" /></li>
              <li><img className="iceGolem" src="/COC/coc_Troops/Ice_Golem.png" alt="iceGolem" /></li>
              <li><img className="headHunter" src="/COC/coc_Troops/Headhunter.png" alt="headHunter" /></li>
            </ul>
          </div>
          <div className="spells block">
            <span className="type">마법</span>
            <ul className="first">
              <li><img className="lightning" src="/COC/coc_Spells/Lightning_Spell.png" alt="lightning" /></li>
              <li><img className="heal" src="/COC/coc_Spells/Healing_Spell.png" alt="heal" /></li>
              <li><img className="rage" src="/COC/coc_Spells/Rage_Spell.png" alt="rage" /></li>
              <li><img className="jump" src="/COC/coc_Spells/Jump_Spell.png" alt="jump" /></li>
              <li><img className="freeze" src="/COC/coc_Spells/Freeze_Spell.png" alt="freeze" /></li>
              <li><img className="clone" src="/COC/coc_Spells/Clone_Spell.png" alt="clone" /></li>
              <li><img className="invisibility" src="/COC/coc_Spells/Invisibility_Spell.png" alt="invisibility" /></li>
              <li><img className="poison" src="/COC/coc_Spells/Poison_Spell.png" alt="poison" /></li>
              <li><img className="earthquake" src="/COC/coc_Spells/Earthquake_Spell.png" alt="earthquake" /></li>
            </ul>
            <ul className="second">
              <li><img className="haste" src="/COC/coc_Spells/Haste_Spell.png" alt="haste" /></li>
              <li><img className="skeleton" src="/COC/coc_Spells/Skeleton_Spell.png" alt="skeleton" /></li>
              <li><img className="bat" src="/COC/coc_Spells/Bat_Spell.png" alt="bat" /></li>
            </ul>
          </div>
          <div className="siegeMachines block">
            <span className="type">시즈 머신</span>
            <ul className="first">
              <li><img className="wallWrecker" src="/COC/coc_SiegeMachines/Wall_Wrecker.png" alt="wallWrecker" /></li>
              <li><img className="battleBlimp" src="/COC/coc_SiegeMachines/Battle_Blimp.png" alt="battleBlimp" /></li>
              <li><img className="stoneSlammer" src="/COC/coc_SiegeMachines/Stone_Slammer.png" alt="stoneSlammer" /></li>
              <li><img className="siegeBarracks" src="/COC/coc_SiegeMachines/Siege_Barracks.png" alt="siegeBarracks" /></li>
              <li><img className="logLauncher" src="/COC/coc_SiegeMachines/Log_Launcher.png" alt="logLauncher" /></li>
            </ul>
          </div>
        </div>
      </Army>
    </div>
  );
};

export default ProfileInfo;