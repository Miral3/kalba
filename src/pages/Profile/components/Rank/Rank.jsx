import React from "react";
import PropTypes from "prop-types";
import * as S from "./Rank.style";

const propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

const Rank = ({ data }) => {
  return (
    <S.Container>
      <S.Header>전체 통계</S.Header>
      <S.RankContainer>
        <S.Content>
          <S.RankWrapper>
            <S.Badge
              src="https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png"
              alt="leagueBadge"
            />
            <S.Rank>#{data.scoreRank}</S.Rank>
          </S.RankWrapper>
          <div>
            <S.Type>공격력</S.Type>
            <S.ScoreBlock>
              <S.Trophy small src="/img/coc/coc_Trophy.png" alt="trophy" />
              <S.Score>{data.score}</S.Score>
            </S.ScoreBlock>
          </div>
        </S.Content>
        <S.Content>
          <S.RankWrapper>
            <S.Badge
              src="https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxgyC9mm_mVMIjAbmGoZtw.png"
              alt="leagueBadge"
            />
            <S.Rank>#{data.donationRank}</S.Rank>
          </S.RankWrapper>
          <div>
            <S.Type>지원량</S.Type>
            <S.ScoreBlock>
              <S.Trophy small src="/img/coc/coc_Trophy.png" alt="trophy" />
              <S.Score>{data.donations}</S.Score>
            </S.ScoreBlock>
          </div>
        </S.Content>
      </S.RankContainer>
    </S.Container>
  );
};

Rank.propTypes = propTypes;

export default Rank;
