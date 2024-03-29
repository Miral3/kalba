import React from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { updateLoading } from "../../../../recoil/score";
import Count from "../Count/Count";
import { Table, Text, Button, Spinner } from "../../../../components";
import * as S from "./Top10Table.style";
import Common from "../../../../styles/common";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  handleUpdateRankData: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Top10Table = ({ data, columns, handleUpdateRankData, title }) => {
  const type = title.includes("지원") ? "donations" : "score";
  const isLoading = useRecoilValue(updateLoading);

  return (
    <S.Container>
      <Table columns={columns} data={data} sticky={false}>
        <S.Caption>
          <S.CaptionContainer>
            <Text
              size={Common.fontSize.h[1]}
              color={Common.colors.white[0]}
              weight="bold"
            >
              {title}
            </Text>
            <div>
              <Count type={type} />
              <S.ActionContainer>
                {isLoading ? (
                  <Spinner.Base size="19.5px" />
                ) : (
                  <Button onClick={() => handleUpdateRankData()}>갱신</Button>
                )}
                <NavLink to={`/leaderboards/${type}`}>더보기</NavLink>
              </S.ActionContainer>
            </div>
          </S.CaptionContainer>
        </S.Caption>
      </Table>
    </S.Container>
  );
};

Top10Table.propTypes = propTypes;

export default Top10Table;
