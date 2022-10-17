import React, { forwardRef } from "react";
import { PropTypes } from "prop-types";
import { translateRole } from "../../utils/translate";
import { Text, Button } from "..";
import * as S from "./Table.style";

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  version: PropTypes.string,
  sticky: PropTypes.bool,
  editMode: PropTypes.bool,
  handleInputTableData: PropTypes.func,
  handleDeleteTableData: PropTypes.func,
  handleChangeState: PropTypes.func,
};

const defaultProps = {
  children: null,
  version: "leaderboard",
  sticky: true,
  editMode: false,
  handleInputTableData: () => {},
  handleDeleteTableData: () => {},
  handleChangeState: () => {},
};

const Table = forwardRef(
  (
    {
      children,
      data,
      columns,
      version,
      sticky,
      editMode,
      handleInputTableData,
      handleDeleteTableData,
      handleChangeState,
      ...styles
    },
    ref
  ) => {
    return (
      <S.Table ref={ref} {...styles}>
        {children}
        <S.Thead sticky={sticky}>
          <S.Tr>
            {columns.map((column) => (
              <S.Th key={column.id} version={version}>
                {column.header}
              </S.Th>
            ))}
            {editMode && <S.Th version={version}>삭제</S.Th>}
          </S.Tr>
        </S.Thead>

        <S.Tbody version={version}>
          {data.map((row) => (
            <S.Tr key={row.tag}>
              {columns.map((column) => {
                if (version === "leaderboard") {
                  if (column.accessor === "name") {
                    return (
                      <S.Td key={column.id} version={version}>
                        <S.Link to={`/profile/${row.tag.substr(1)}`}>
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
                      <S.Td key={column.id} version={version}>
                        {translateRole(row[column.accessor])}
                      </S.Td>
                    );
                  }
                  return (
                    <S.Td key={column.id} version={version}>
                      {row[column.accessor]}
                    </S.Td>
                  );
                }
                if (version === "management") {
                  if (column.accessor === "nickname") {
                    return (
                      <S.Td key={column.id} version={version}>
                        {row[column.accessor]}
                      </S.Td>
                    );
                  }
                  if (column.accessor === "signupState") {
                    return (
                      <S.Td key={column.id} version={version}>
                        {row[column.accessor] ? "O" : "X"}
                      </S.Td>
                    );
                  }
                  return (
                    <S.Td key={column.id} version={version}>
                      <input
                        type="checkbox"
                        value={row[column.accessor]}
                        onChange={(e) =>
                          handleChangeState(row.tag, column.accessor, e)
                        }
                      />
                    </S.Td>
                  );
                }
                if (version === "editableStandard") {
                  if (column.accessor === "value") {
                    return (
                      <S.Td key={column.id} version={version}>
                        {Math.round((row.maxScore / row.maxLevel) * 1000) /
                          1000}
                      </S.Td>
                    );
                  }
                  return (
                    <S.Td
                      key={column.id}
                      id={row.index}
                      name={column.accessor}
                      version={version}
                      contentEditable={editMode}
                      suppressContentEditableWarning
                      handleInputTableData={(e) => handleInputTableData(e)}
                    >
                      {row[column.accessor]}
                    </S.Td>
                  );
                }
                return (
                  <S.Td key={column.id} version={version}>
                    {row[column.accessor]}
                  </S.Td>
                );
              })}
              {editMode && (
                <S.Td version={version}>
                  <Button
                    hover
                    onClick={() => handleDeleteTableData(row.index)}
                  >
                    <S.Delete className="material-symbols-outlined">
                      delete
                    </S.Delete>
                  </Button>
                </S.Td>
              )}
            </S.Tr>
          ))}
        </S.Tbody>
      </S.Table>
    );
  }
);

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
