import React from "react";
import PropTypes from "prop-types";
import Box from "./Box";
import * as S from "../Table/Table.style";

const propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  version: PropTypes.string,
};

const defaultProps = {
  columns: 50,
  rows: 5,
  version: "leaderboard",
};

const Table = ({ columns, rows, version }) => {
  return (
    <S.SkeletonTbody version={version}>
      {Array.from(Array(columns), (column, index) => (
        <S.Tr key={index}>
          {Array.from(Array(rows), (row, idx) => (
            <S.SkeletonTd version={version} skeleton>
              <Box width="100%" height="18px" key={idx} />
            </S.SkeletonTd>
          ))}
        </S.Tr>
      ))}
    </S.SkeletonTbody>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
