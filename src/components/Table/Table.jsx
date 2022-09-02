import React from "react";
import { PropTypes } from "prop-types";
import * as S from "./Table.style";
import { Text } from "..";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  version: PropTypes.string,
};

const defaultProps = {
  version: "leaderboard",
};

const Table = ({ data, columns, version, ...styles }) => {
  const translateRole = (role) => {
    switch (role) {
      case "leader":
        return "대표";
      case "coLeader":
        return "공대";
      case "admin":
        return "장로";
      default:
        return "멤버";
    }
  };

  return (
    <S.Table {...styles}>
      <S.Thead>
        <S.Tr>
          {columns.map((column) => (
            <S.Th key={column.id} version={version}>
              {column.header}
            </S.Th>
          ))}
        </S.Tr>
      </S.Thead>
      <S.Tbody>
        {data.map((row) => (
          <S.Tr key={row.id}>
            {columns.map((column) => {
              if (version === "leaderboard" && column.accessor === "name") {
                return (
                  <S.Td key={column.id}>
                    <S.Link to={`/profile/${row.tag}`}>
                      <S.Trophy src={row.league.iconTiny} alt="trophy" />
                      <Text size="13px" weight="bold">
                        {row[column.accessor]}
                      </Text>
                    </S.Link>
                  </S.Td>
                );
              }
              if (column.accessor === "role") {
                return (
                  <S.Td key={column.id}>
                    {translateRole(row[column.accessor])}
                  </S.Td>
                );
              }
              return <S.Td key={column.id}>{row[column.accessor]}</S.Td>;
            })}
          </S.Tr>
        ))}
      </S.Tbody>
    </S.Table>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
