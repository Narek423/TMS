import { ITaskItem } from '@/types/columns';
import React, { FC, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import AddCard from '../add-a-card';
import CardItem from '../cards/card-item';
import ImageThreeButton from '../image-three-button';
import ColumnInput from './column-input';
import styles from './styles.module.scss';

type DroppableColumnProps = {
  columnId: string;
  column: { title: string; items: ITaskItem[] };
  providedDrag: any;
};

const DroppableColumn: FC<DroppableColumnProps> = ({
  column,
  columnId,
  providedDrag,
}) => {
  const [addTaskSwitcher, setAddTaskSwitcher] = useState<boolean>(false);

  const [titleInputSwitcher, setTitleInputSwitcher] = useState<boolean>(false);

  return (
    <>
      <Droppable key={columnId} droppableId={columnId}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className={styles.title_container}>
              {!titleInputSwitcher ? (
                <h3
                  onClick={e => {
                    setTitleInputSwitcher(true);
                    e.stopPropagation();
                  }}
                  className={styles.title}
                  {...providedDrag.dragHandleProps}
                >
                  {column.title}
                </h3>
              ) : (
                <ColumnInput
                  setTitleInputSwitcher={setTitleInputSwitcher}
                  columnTitle={column.title}
                  providedDrag={providedDrag}
                  columnId={columnId}
                />
              )}
              <div className={styles.pointsIcons}>
                <ImageThreeButton
                  columnId={columnId}
                  setAddTaskSwitcher={setAddTaskSwitcher}
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.colmBody}>
                {column.items?.map((item, index) => (
                  <CardItem
                    key={item.id}
                    item={item}
                    index={index}
                    columnId={columnId}
                  />
                ))}
              </div>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <AddCard
        columnId={columnId}
        addTaskSwitcher={addTaskSwitcher}
        setAddTaskSwitcher={setAddTaskSwitcher}
      />
    </>
  );
};

export default DroppableColumn;
