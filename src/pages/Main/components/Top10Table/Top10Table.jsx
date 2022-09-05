import React from "react";
import { PropTypes } from "prop-types";
import { Table, Text } from "../../../../components";
import * as S from "./Top10Table.style";
import Common from "../../../../styles/common";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
};

const Top10Table = ({ data, columns, title, timer }) => {
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
              <Text
                size={Common.fontSize.b[1]}
                color={Common.colors.white[0]}
                weight="bold"
              >
                {timer}
              </Text>
              <S.ButtonContainer>
                <S.StyledButton version="text">갱신</S.StyledButton>
                <S.StyledButton version="text">더보기</S.StyledButton>
              </S.ButtonContainer>
            </div>
          </S.CaptionContainer>
        </S.Caption>
      </Table>
    </S.Container>
  );
};

Top10Table.propTypes = propTypes;

export default Top10Table;
