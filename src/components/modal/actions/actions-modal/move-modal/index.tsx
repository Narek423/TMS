import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAppContext } from '@/context';
import { ITaskItem } from '@/types/columns';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type MemberProps = {
  moveModal: boolean;
  onClose: () => void;
  columnId: string;
  item: ITaskItem;
};

const MoveModal: FC<MemberProps> = ({ moveModal, onClose, columnId, item }) => {
  const { columnList, setColumnList, addTaskStorage } = useAppContext();
  const [currentColumnItemsForMap, setCurrentColumnItemsForMap] = useState(
    columnList[columnId]?.items,
  );

  const columnListArray = Object.entries(columnList);
  const nextColumnIndex = Object.keys(columnList).indexOf(columnId) + 1;
  const nextColumn = columnListArray[nextColumnIndex];

  const moveTaskNextColumn = () => {
    nextColumn?.[1].items.unshift(item);
    const remuveIndex =
      columnListArray[nextColumnIndex - 1]?.[1].items.indexOf(item);
    columnListArray[nextColumnIndex - 1]?.[1].items.splice(
      remuveIndex as number,
      1,
    );

    setColumnList(Object.fromEntries(columnListArray));
    addTaskStorage(Object.fromEntries(columnListArray));
  };

  const [selectValueList, setSelectValueList] = useState(columnId);

  const [selectValuePosition, setSelectValuePosition] = useState(
    `${(columnList[columnId]?.items.indexOf(item) || -1) + 1}`,
  );

  const moveTask = () => {
    const columnUid = selectValueList;
    const selectedPositionForTask = selectValuePosition;

    if (
      columnId === columnUid &&
      selectedPositionForTask ===
        `${(columnList[columnId]?.items.indexOf(item) || -1) + 1}`
    ) {
      onClose();
      return;
    }

    const currentColumn = Object.keys(columnList).indexOf(columnId);
    const remuveIndex = columnListArray[currentColumn]?.[1].items.indexOf(item);

    if (remuveIndex !== undefined)
      columnListArray[currentColumn]?.[1].items.splice(remuveIndex, 1);

    setColumnList(Object.fromEntries(columnListArray));

    const columListCopy = { ...columnList };

    columListCopy[columnUid]?.items.splice(
      Number(selectedPositionForTask) - 1,
      0,
      item,
    );

    setColumnList(columListCopy);
    addTaskStorage(columListCopy);
  };

  return (
    <div>
      {!moveModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Move card</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>
          {nextColumn?.[1].title ? (
            <div className={styles.suggested_container}>
              <div className={styles.title_suggested}>
                <AutoAwesomeIcon
                  fontSize={'inherit'}
                  className={styles.sparkles_icon}
                />
                Suggested
              </div>
              <div
                className={styles.button_suggested}
                onClick={moveTaskNextColumn}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={styles.icon_arrow}
                />
                {nextColumn?.[1].title}
              </div>
            </div>
          ) : null}

          <div className={styles.select_destination}>
            <div className={styles.select_destination_title}>
              Select destination
            </div>
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
            <span className={styles.move_button} onClick={moveTask}>
              Move
            </span>
          </div>
        </ClickAway>
      )}
    </div>
  );
};

export default MoveModal;
