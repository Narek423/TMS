import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '@/context';
import { ITaskItem } from '@/types/columns';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type MoveListModalProps = {
  moveModal: boolean;
  onClose: () => void;
  columnId: string;
  closeMainModal: () => void;
};

const MoveListModal: FC<MoveListModalProps> = ({
  moveModal,
  onClose,
  columnId,
  closeMainModal,
}) => {
  const { columnList, setColumnList, addTaskStorage, setColumnOrder } =
    useAppContext();

  const columnListArray = Object.entries(columnList);

  const currentColumnIndex = Object.keys(columnList).indexOf(columnId);

  const [selectValuePosition, setSelectValuePosition] = useState(
    `${(currentColumnIndex || -1) + 1}`,
  );

  const moveList = () => {
    if (`${(currentColumnIndex || -1) + 1}` === selectValuePosition) {
      onClose();
      return;
    }

    const removeItem = columnListArray?.splice(currentColumnIndex, 1).flat();

    columnListArray?.splice(
      Number(selectValuePosition) - 1,
      0,
      removeItem as [string, { title: string; items: ITaskItem[] }],
    );

    const result = Object.fromEntries(columnListArray);

    setColumnList(result);
    setColumnOrder(Object.keys(result));
    addTaskStorage(result);
    closeMainModal();
    onClose();
  };

  return (
    <div>
      {!moveModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Move list</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>

          <div className={styles.select_button_container}>
            <div className={styles.list_button}>
              <span>List</span>
              <div className={styles.column_name}>
                {columnList[columnId]?.title}
              </div>
            </div>
            <div className={styles.position_button}>
              <span>Position</span>
              <select
                id="position"
                className={styles.select_button_position}
                value={selectValuePosition}
                onChange={e => {
                  setSelectValuePosition(e.target.value);
                }}
              >
                {columnListArray?.map((elem, index) => {
                  return (
                    <option key={index + Math.random()} value={`${index + 1}`}>
                      {elem[0] === columnId
                        ? `${index + 1} (cur)`
                        : `${index + 1}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <span className={styles.move_button} onClick={moveList}>
            Move
          </span>
        </ClickAway>
      )}
    </div>
  );
};

export default MoveListModal;
