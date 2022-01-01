import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;  
  margin-top: 1rem;
  justify-content: space-around;
  width:100%;
  
  .tableBlock {
    padding-bottom: 1rem;
    width: 100%;
    @media (min-width: 576px) {
      max-width: 540px;
    }
    @media (min-width: 768px) {
      max-width: 720px;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead tr th {
    position: sticky;
    top: 0;
    font-weight: normal;
    color: ${({ theme }) => theme.fontColors.listHeader};
    font-size: 14px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.bgColors.listSecondHeader};
    @media (max-width: 425px) {
      padding: 12px 12px;
    }
    @media (max-width: 385px) {
      font-size: 12px;
      padding: 12px 8px;
    }
  }
  th,
  td {
    padding: 0.5rem;
  }
  .editMode {
      padding: 10.5px 16px;
  }
  tbody {
    background-color: ${({ theme }) => theme.bgColors.listContents};
  }
  tbody tr td {
    border-bottom: ${({ theme }) => theme.borderColors.list};
    font-size: 14px;
    padding: 12px 16px;
    text-align: center;
    color: ${({ theme }) => theme.fontColors.listInfo};
    /* .maxScore,
    .maxLevel {
      width: 50px;
    } */
  }
  tbody tr td {
    :nth-child(1) {
      width: 40%;
    }
    .korean {
      width: 100px;
    }
    .maxScore, .maxLevel {
      text-align: center;
      width: 53px;
    }
  }
`

const Tr = styled.tr`
  background-color: ${({ theme }) => theme.bgColors.listContents};
  display: ${({ isDragging }) => (isDragging ? "table" : "")};
`

const Table = ({ columns, data, handleRemove, handleReorderData, editMode, updateData }) => {
  const { getTableProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, handleRemove, handleReorderData, updateData }, useGlobalFilter, useSortBy);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    handleReorderData(source.index, destination.index);
  }

  return (
    <Container>
      <div className="tableBlock">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="table-body">
              {(provided, snapshot) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        draggableId={row.id}
                        key={row.id}
                        index={index}
                        isDragDisabled={editMode ? false : true}
                      >
                        {(provided, snapshot) => {
                          return (
                            <Tr
                              ref={provided.innerRef}
                              isDragging={snapshot.isDragging}
                              {...provided.draggableProps}
                              // {...provided.dragHandleProps}
                              {...row.getRowProps()}
                            >
                              {row.cells.map((cell) => (
                                <td className="editMode" {...cell.getCellProps()}>
                                  {cell.render("Cell", {
                                    dragHandleProps: provided.dragHandleProps,
                                    isSomethingDragging: snapshot.isDraggingOver,
                                    editMode: editMode
                                  })}
                                </td>
                              ))}
                            </Tr>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </Container>
  );
}

export default Table;
