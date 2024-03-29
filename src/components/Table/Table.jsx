import React, { forwardRef } from "react";
import { PropTypes } from "prop-types";
import { translateRole, translateOpenChatState } from "../../utils/translate";
import { Text } from "..";
import EditableTbody from "./EditableTbody";
import * as S from "./Table.style";

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  version: PropTypes.string,
  sortDir: PropTypes.string,
  attr: PropTypes.string,
  sticky: PropTypes.bool,
  editMode: PropTypes.bool,
  deleteMode: PropTypes.bool,
  sort: PropTypes.bool,
  isDragDisabled: PropTypes.bool,
  handleClickDeleteMode: PropTypes.func,
  handleInputTableData: PropTypes.func,
  handleDeleteTableData: PropTypes.func,
  handleChangeOpenChatState: PropTypes.func,
  handleReorderTableData: PropTypes.func,
  handleSort: PropTypes.func,
};

const defaultProps = {
  children: null,
  version: "leaderboard",
  sortDir: null,
  attr: null,
  sticky: true,
  editMode: false,
  deleteMode: true,
  sort: false,
  isDragDisabled: true,
  handleClickDeleteMode: () => {},
  handleInputTableData: () => {},
  handleDeleteTableData: () => {},
  handleChangeOpenChatState: () => {},
  handleReorderTableData: () => {},
  handleSort: () => {},
};

const Table = forwardRef(
  (
    {
      children,
      data,
      columns,
      version,
      sortDir,
      attr,
      sticky,
      editMode,
      deleteMode,
      sort,
      isDragDisabled,
      handleClickDeleteMode,
      handleInputTableData,
      handleDeleteTableData,
      handleChangeOpenChatState,
      handleReorderTableData,
      handleSort,
      ...styles
    },
    ref
  ) => {
    return (
      <S.Table ref={ref} {...styles}>
        {children}
        <S.Thead sticky={sticky}>
          <S.Tr>
            {columns.map((column) =>
              sort &&
              (column.accessor === "role" ||
                column.accessor === "expectedRole") ? (
                <S.Th
                  key={column.id}
                  version={version}
                  name={column.accessor}
                  active
                  onClick={(e) => handleSort(e)}
                >
                  <S.SortWrapper>
                    {column.header}
                    <S.Arrow
                      className="material-symbols-outlined"
                      active={attr === column.accessor}
                      sortDir={sortDir}
                    >
                      arrow_upward
                    </S.Arrow>
                  </S.SortWrapper>
                </S.Th>
              ) : (
                <S.Th key={column.id} version={version}>
                  {column.header}
                </S.Th>
              )
            )}
            {editMode && (
              <S.Th
                active
                version={version}
                onClick={() => handleClickDeleteMode(!deleteMode)}
              >
                {deleteMode ? "삭제" : "이동"}
              </S.Th>
            )}
          </S.Tr>
        </S.Thead>
        {version === "editableStandard" ? (
          <EditableTbody
            data={data}
            columns={columns}
            version={version}
            editMode={editMode}
            deleteMode={deleteMode}
            isDragDisabled={isDragDisabled}
            handleInputTableData={handleInputTableData}
            handleDeleteTableData={handleDeleteTableData}
            handleReorderTableData={handleReorderTableData}
          />
        ) : (
          <S.Tbody version={version}>
            {data.map((row) => (
              <S.Tr key={row.tag || row.name}>
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
                    if (
                      column.accessor === "role" ||
                      column.accessor === "expectedRole"
                    ) {
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
                    if (column.accessor === "signupState") {
                      return (
                        <S.Td key={column.id} version={version}>
                          {row[column.accessor] ? "O" : "X"}
                        </S.Td>
                      );
                    }
                    if (column.accessor === "openChatStateType") {
                      return (
                        <S.Td
                          clickEvent
                          key={column.id}
                          version={version}
                          onClick={() =>
                            handleChangeOpenChatState(
                              row[column.accessor],
                              row.tag
                            )
                          }
                        >
                          {translateOpenChatState(row[column.accessor])}
                        </S.Td>
                      );
                    }
                    return (
                      <S.Td key={column.id} version={version}>
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
              </S.Tr>
            ))}
          </S.Tbody>
        )}
      </S.Table>
    );
  }
);

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
