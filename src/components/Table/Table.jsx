import React, { forwardRef } from "react";
import { PropTypes } from "prop-types";
import useSort from "../../hooks/useSort";
import { translateRole } from "../../utils/translate";
import { Text } from "..";
import EditableTbody from "./EditableTbody";
import * as S from "./Table.style";

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  version: PropTypes.string,
  sticky: PropTypes.bool,
  editMode: PropTypes.bool,
  deleteMode: PropTypes.bool,
  sort: PropTypes.bool,
  isDragDisabled: PropTypes.bool,
  handleClickDeleteMode: PropTypes.func,
  handleInputTableData: PropTypes.func,
  handleDeleteTableData: PropTypes.func,
  handleChangeState: PropTypes.func,
  handleReorderTableData: PropTypes.func,
};

const defaultProps = {
  children: null,
  version: "leaderboard",
  sticky: true,
  editMode: false,
  deleteMode: true,
  sort: false,
  isDragDisabled: true,
  handleClickDeleteMode: () => {},
  handleInputTableData: () => {},
  handleDeleteTableData: () => {},
  handleChangeState: () => {},
  handleReorderTableData: () => {},
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
      deleteMode,
      sort,
      isDragDisabled,
      handleClickDeleteMode,
      handleInputTableData,
      handleDeleteTableData,
      handleChangeState,
      handleReorderTableData,
      ...styles
    },
    ref
  ) => {
    const { sortedData, sortDir, attr, handleSort } = useSort({ data });
    const tableData = sort ? sortedData : data;

    return (
      <S.Table ref={ref} {...styles}>
        {children}
        <S.Thead sticky={sticky}>
          <S.Tr>
            {columns.map((column) =>
              column.accessor === "role" ||
              column.accessor === "expectedRole" ? (
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
            {tableData.map((row) => (
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
