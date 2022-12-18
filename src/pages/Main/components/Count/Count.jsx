import React, { useState } from "react";
import { PropTypes } from "prop-types";
import useInterval from "../../../../hooks/useInterval";
import {
  calcRemainTime,
  getPromotionDate,
  getLeagueDate,
  prettierTime,
} from "../../utils/timer";
import { Text } from "../../../../components";
import Common from "../../../../styles/common";

const propTypes = {
  type: PropTypes.string.isRequired,
};

const Count = ({ type }) => {
  const current = new Date();
  const [timer, setTimer] = useState(
    type === "donations"
      ? calcRemainTime(current, getPromotionDate())
      : calcRemainTime(current, getLeagueDate())
  );

  useInterval(() => {
    if (type === "donations") {
      setTimer(calcRemainTime(current, getPromotionDate()));
    } else if (type === "score") {
      setTimer(calcRemainTime(current, getLeagueDate()));
    }
  }, 1000);

  if (type === "score") {
    return (
      <Text
        size={Common.fontSize.b[1]}
        color={Common.colors.white[0]}
        weight="bold"
      >
        리그전: {prettierTime(timer)}
      </Text>
    );
  }
  if (type === "donations") {
    return (
      <Text
        size={Common.fontSize.b[1]}
        color={Common.colors.white[0]}
        weight="bold"
      >
        승강전: {prettierTime(timer)}
      </Text>
    );
  }
};

Count.propTypes = propTypes;

export default Count;
