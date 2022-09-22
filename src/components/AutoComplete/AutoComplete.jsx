import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./AutoComplete.style";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  active: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
};

const AutoComplete = forwardRef(({ data, active, visible }, ref) => {
  return (
    <S.Container visible={visible}>
      <S.List ref={ref}>
        {data.map((item, idx) => (
          <S.Item key={item.tag} active={active === idx}>
            <S.Link to={`/profile/${item.tag}`}>
              <S.Name>{item.name}</S.Name>
              <S.Tag> - {item.tag}</S.Tag>
            </S.Link>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
});

AutoComplete.propTypes = propTypes;

export default AutoComplete;
