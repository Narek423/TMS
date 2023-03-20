import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '@/context';
import { ITaskItem } from '@/types/columns';
import { v4 as uuidv4 } from 'uuid';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type CopyModalProps = {
  copyModal: boolean;
  onClose: () => void;
  columnId: string;
  item: ITaskItem;
};

const CopyModal: FC<CopyModalProps> = ({
  copyModal,
  onClose,
  columnId,
  item,
}) => {
  const { columnList, setColumnList, addTaskStorage } = useAppContext();
  const [currentColumnItemsForMap, setCurrentColumnItemsForMap] = useState(
    columnList[columnId]?.items,
  );
  const [selectValueList, setSelectValueList] = useState(columnId);
  const [selectValuePosition, setSelectValuePosition] = useState(
    `${(columnList[columnId]?.items.indexOf(item) || -1) + 1}`,
  );
  const [copyTaskName, setCopyTaskName] = useState(item.task);

  const columnListArray = Object.entries(columnList);

  const copyTask = () => {
    const columnUid = selectValueList;
    const selectedPositionForTask = selectValuePosition;

    if (!copyTaskName.trim()) {
      setCopyTaskName('');
      return;
    }

    const columListCopy = { ...columnList };

    columListCopy[columnUid]?.items.splice(
      Number(selectedPositionForTask) - 1,
      0,
      { ...item, id: uuidv4(), task: copyTaskName },
    );

    setColumnList(columListCopy);
    addTaskStorage(columListCopy);
    onClose();
  };

  const onClickAndKeyPressHandler = (e: any) => {
    if (e.key === 'Escape') {
      setCopyTaskName('');
      onClose();
    }

    if (e.key === 'Enter' || e.type === 'click') {
      if (copyTaskName?.trim() === '') {
        setCopyTaskName('');
        return;
      }
      copyTask();
      setCopyTaskName('');
      onClose();
    }
  };

  return (
    <div>
      {!copyModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Copy card</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>

          <div className={styles.input_container}>
            <div className={styles.title_input}>Title</div>
            <textarea
              className={styles.copy_input}
              value={copyTaskName}
              onChange={e => setCopyTaskName(e.target.value)}
              onKeyDown={e => {
                onClickAndKeyPressHandler(e);
              }}
            />
          </div>

          <div className={styles.select_destination}>
            <div className={styles.select_destination_title}>Copy to…</div>
            <div className={styles.select_button_container}>
              <div className={styles.list_button}>
                <span>List</span>
                <select
                  id="list"
                  className={styles.select_button}
                  value={selectValueList}
                  onChange={e => {
                    setCurrentColumnItemsForMap(() =>
                      columnList[e.target.value]?.items.concat({} as ITaskItem),
                    );
                    setSelectValuePosition(
                      `${(columnList[e.target.value]?.items.length || -1) + 1}`,
                    );

                    setSelectValueList(e.target.value);
                  }}
                >
                  {columnListArray.map((elem, index) => {
                    return (
                      <option key={index + Math.random()} value={elem[0]}>
                        {columnId === elem[0]
                          ? `${elem[1].title} (cur)`
                          : elem[1].title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.position_button}>
                <span>Position</span>
                <select
                  id="position"
                  className={styles.select_button}
                  value={selectValuePosition}
                  onChange={e => {
                    setSelectValuePosition(e.target.value);
                  }}
                >
                  {currentColumnItemsForMap?.map((elem, index) => {
                    return (
                      <option
                        key={index + Math.random()}
                        value={`${index + 1}`}
                      >
                        {elem === item ? `${index + 1} (cur)` : `${index + 1}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <span className={styles.move_button} onClick={copyTask}>
              Create card
            </span>
          </div>
        </ClickAway>
      )}
    </div>
  );
};

export default CopyModal;
