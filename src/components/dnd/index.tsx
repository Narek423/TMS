import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { useAppContext } from '@/context';
import { IColumn, ITaskItem } from '@/types/columns';
import reorder from '@/utils/reorder';
import styles from './styles.module.scss';
import DroppableColumn from '../droppable-column';
import StrictModeDroppable from '../Strict-mode-droppable/StrictModeDroppable';

type DndTestProps = {};

const Dnd: FC<DndTestProps> = () => {
  const {
    columnList,
    setColumnList,
    addTaskStorage,
    setColumnOrder,
    columnOrder,
  } = useAppContext();

  const [isBrowser, setIsBrowser] = useState(false);

  const onDragEnd = (
    result: DropResult,
    columns: IColumn,
    setColumns: Dispatch<SetStateAction<IColumn>>,
  ) => {
    if (!result.destination) {
      return;
    }

    const { source } = result;
    const { destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'COLUMN') {
      const reorderedorder = reorder(
        columnOrder,
        source.index,
        destination.index,
      );

      setColumnOrder(reorderedorder as string[]);

      const columnListCopy = { ...columnList };

      const resultReorderdCol = reorderedorder.map(elem => {
        const data = columnListCopy[elem as string];

        return [elem, data];
      });

      setColumns(Object.fromEntries(resultReorderdCol));
      addTaskStorage(Object.fromEntries(resultReorderdCol));

      return;
    }

    if (!result.destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId] as {
        title: string;
        items: ITaskItem[];
      };
      const destColumn = columns[destination.droppableId] as {
        title: string;
        items: ITaskItem[];
      };

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed as ITaskItem);

      const reOrderedItemsColumnList = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };

      setColumns(reOrderedItemsColumnList);
      addTaskStorage(reOrderedItemsColumnList);
    } else {
      const column = columns[source.droppableId] as {
        title: string;
        items: ITaskItem[];
      };
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed as ITaskItem);

      const reOrderedItemsColumnList = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };

      setColumns(reOrderedItemsColumnList);
      addTaskStorage(reOrderedItemsColumnList);
    }
  };

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return (
    <>
      {isBrowser ? (
        <DragDropContext
          onDragEnd={result => {
            onDragEnd(result, columnList, setColumnList);
          }}
        >
          <StrictModeDroppable
            droppableId="board"
            type="COLUMN"
            direction="horizontal"
          >
            {provided => (
              <div
                className={styles['dnd-container']}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnList &&
                  Object.entries(columnList).map(
                    ([columnId, column], index) => {
                      return (
                        <Draggable
                          key={columnId}
                          draggableId={columnId}
                          index={index}
                        >
                          {providedDrag => (
                            <div
                              className={styles.columnWrapper}
                              ref={providedDrag.innerRef}
                              {...providedDrag.draggableProps}
                            >
                              <DroppableColumn
                                providedDrag={providedDrag}
                                column={column}
                                columnId={columnId}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    },
                  )}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      ) : null}
    </>
  );
};

export default Dnd;
