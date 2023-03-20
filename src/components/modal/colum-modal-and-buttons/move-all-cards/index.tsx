import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@/context';
import { ITaskItem } from '@/types/columns';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type MoveAllCardsModalProps = {
  moveAllCards: boolean;
  onClose: () => void;
  columnId: string;
  closeMainModal: () => void;
};

const MoveAllCardsModal: FC<MoveAllCardsModalProps> = ({
  moveAllCards,
  onClose,
  columnId,
  closeMainModal,
}) => {
  const { columnList, setColumnList, addTaskStorage } = useAppContext();

  const columnListArray = Object.entries(columnList);

  const moveAllTask = (ColId: string) => {
    const columListCopy = { ...columnList };

    columListCopy[ColId]?.items.push(
      ...(columListCopy[columnId]?.items as ITaskItem[]),
    );

    columListCopy[columnId]?.items.splice(0);

    setColumnList(columListCopy);
    addTaskStorage(columListCopy);
    closeMainModal();
    onClose();
  };

  return (
    <div>
      {!moveAllCards ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Move all cards in list</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>

          <div className={styles.button_container}>
            {columnListArray.map((elem, index) => {
              return (
                <option
                  key={index + Math.random()}
                  value={elem[0]}
                  className={
                    columnId === elem[0]
                      ? styles.column_select_disabled
                      : styles.column_select
                  }
                  disabled={columnId === elem[0]}
                  onClick={() => moveAllTask(elem[0])}
                >
                  {columnId === elem[0]
                    ? `${elem[1].title} (cur)`
                    : elem[1].title}
                </option>
              );
            })}
          </div>
        </ClickAway>
      )}
    </div>
  );
};

export default MoveAllCardsModal;
