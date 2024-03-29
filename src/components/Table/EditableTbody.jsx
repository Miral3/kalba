import React from "react";
import { PropTypes } from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "..";
import * as S from "./Table.style";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  version: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  deleteMode: PropTypes.bool.isRequired,
  isDragDisabled: PropTypes.bool.isRequired,
  handleInputTableData: PropTypes.func.isRequired,
  handleDeleteTableData: PropTypes.func.isRequired,
  handleReorderTableData: PropTypes.func.isRequired,
};

const EditableTbody = ({
  data,
  columns,
  version,
  editMode,
  deleteMode,
  isDragDisabled,
  handleInputTableData,
  handleDeleteTableData,
  handleReorderTableData,
}) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    handleReorderTableData(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="table-body">
        {(provided) => (
          <S.Tbody
            version={version}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data.map((row, index) => (
              <Draggable
                key={row.name}
                draggableId={row.name}
                index={index}
                isDragDisabled={isDragDisabled}
              >
                {(provided, snapshot) => (
                  <S.Tr
                    key={row.name}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                  >
                    {columns.map((column) => {
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
                          id={index}
                          name={column.accessor}
                          version={version}
                          contentEditable={editMode}
                          suppressContentEditableWarning
                          onInput={(e) => handleInputTableData(e)}
                        >
                          {row[column.accessor]}
                        </S.Td>
                      );
                    })}
                    {editMode && (
                      <S.Td version={version}>
                        {deleteMode ? (
                          <Button
                            hover
                            onClick={() => handleDeleteTableData(row.name)}
                          >
                            <S.Active className="material-symbols-outlined">
                              delete
                            </S.Active>
                          </Button>
                        ) : (
                          <S.Active
                            className="material-symbols-outlined"
                            {...provided.dragHandleProps}
                          >
                            drag_handle
                          </S.Active>
                        )}
                      </S.Td>
                    )}
                  </S.Tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.Tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

EditableTbody.propTypes = propTypes;

export default EditableTbody;
