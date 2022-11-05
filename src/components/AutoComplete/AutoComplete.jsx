import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as S from "./AutoComplete.style";

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  active: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const AutoComplete = forwardRef(
  ({ isLoading, data, active, visible, onClick }, ref) => {
    if (isLoading || !data) {
      return;
    }
    return (
      <S.Container visible={visible}>
        <S.List ref={ref}>
          {data.map((item, idx) => (
            <S.Item
              key={item.tag}
              active={active === idx}
              onClick={() => onClick(item)}
            >
              <S.Name>{item.name}</S.Name>
              <S.Tag> - {item.tag}</S.Tag>
            </S.Item>
          ))}
        </S.List>
      </S.Container>
    );
  }
);

AutoComplete.propTypes = propTypes;

export default AutoComplete;
