import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "../../../../components";
import {
  translateRole,
  translateLeagueScore,
  translateLeague,
} from "../../../../utils/translate";
import { copyText } from "../../../../utils/copy";
import Common from "../../../../styles/common";
import * as S from "./Info.style";

const propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

const Info = ({ data }) => {
  return (
    <S.Container>
      <S.UserInfo>
        <S.UserInfoContainer>
          <S.LevelWrapper>
            <S.LevelImg alt="level" src="/img/coc/user_level.png" />
            <S.Level>{data.expLevel}</S.Level>
          </S.LevelWrapper>
          <S.Info>
            <S.UserName>{data.name}</S.UserName>
            <S.TagWrapper>
              <S.Tag>{data.tag}</S.Tag>
              <Button
                onClick={() => copyText(data.tag)}
                hover
                style={{ width: 15, height: 15, marginTop: 2 }}
              >
                <Icon
                  size={Common.fontSize.h[2]}
                  weight="bold"
                  color={Common.colors.white[0]}
                >
                  file_copy
                </Icon>
              </Button>
            </S.TagWrapper>
            <S.Role>{translateRole(data.role)}</S.Role>
          </S.Info>
        </S.UserInfoContainer>
        <S.Labels>
          {data.labels.map((label) => (
            <S.Label key={label.id}>
              <img src={`${label.smallIcon}`} alt="label" />
            </S.Label>
          ))}
        </S.Labels>
      </S.UserInfo>
      <S.ClanInfo>
        <S.ClanName>{data.clanName}</S.ClanName>
        <S.ClanBadge src={data.badgeUrls.medium} alt="clanBadge" />
      </S.ClanInfo>
      <S.UserScore>
        <S.LeagueScore>
          <S.LeagueBadge
            src={`${
              data.league.iconMedium != null
                ? data.league.iconMedium
                : data.league.iconSmall
            }`}
            alt="leagueBadge"
          />
          <S.CurrentLeague>
            <S.LeagueNameBlock>
              <S.LeagueName>{translateLeague(data.league.name)}</S.LeagueName>
            </S.LeagueNameBlock>
            <S.LeagueScoreBlock>
              <S.Trophy src="/img/coc/coc_Trophy.png" alt="trophy" />
              <S.Score>{data.trophies}</S.Score>
            </S.LeagueScoreBlock>
          </S.CurrentLeague>
        </S.LeagueScore>
        <S.Type>전체 최고 기록:</S.Type>
        <S.ScoreBlock>
          <S.Image
            src={translateLeagueScore(data.bestTrophies)}
            alt="leagueBadge"
          />
          <S.Trophy small src="/img/coc/coc_Trophy.png" alt="trophy" />
          <S.Score small>{data.bestTrophies}</S.Score>
        </S.ScoreBlock>
        <S.Type>전쟁 별 획득:</S.Type>
        <S.ScoreBlock>
          <S.Image src="/img/coc/war_star.png" alt="leagueBadge" />
          <S.Score small>{data.warStars}</S.Score>
        </S.ScoreBlock>
      </S.UserScore>
    </S.Container>
  );
};

Info.propTypes = propTypes;

export default Info;
