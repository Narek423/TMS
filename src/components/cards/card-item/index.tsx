import { FC, useState } from 'react';
import { ITaskItem } from '@/types/columns';
import { Draggable } from 'react-beautiful-dnd';
import Modal from '@/components/modal';
import Avatar from '../../modal/avatar';
import ItemColor from '../../modal/priority-color/item-color';
import styles from './styles.module.scss';
import DueIndicator from '../due-indicator';

type CardItemProps = {
  item: ITaskItem;
  index: number;
  columnId: string;
};

const CardItem: FC<CardItemProps> = ({ item, index, columnId }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {provided => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.item}
            onClick={e => {
              setOpenModal(true);
              e.stopPropagation();
            }}
          >
            <div
              className={styles.task_priority_color}
              onClick={e => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <ItemColor task={item} isExpanded={isExpanded} />
            </div>
            {item.task}

            <div className={styles.avatar_comp}>
              {item.date?.title && (
                <DueIndicator item={item} columnId={columnId} />
              )}
              <Avatar task={item} />
            </div>
          </div>
          <Modal
            openModal={openModal}
            task={item}
            onClose={() => setOpenModal(false)}
            columnId={columnId}
          />
        </>
      )}
    </Draggable>
  );
};

export default CardItem;
