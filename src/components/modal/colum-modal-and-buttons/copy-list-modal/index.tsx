import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '@/context';

import { ITaskItem } from '@/types/columns';
import { v4 as uuidv4 } from 'uuid';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type CopyListModalProps = {
  copyModal: boolean;
  onClose: () => void;
  columnId: string;
  closeMainModal: () => void;
};

const CopyListModal: FC<CopyListModalProps> = ({
  copyModal,
  onClose,
  columnId,
  closeMainModal,
}) => {
  const { columnList, setColumnList, addTaskStorage, setColumnOrder } =
    useAppContext();

  const [copyListName, setCopyListName] = useState(columnList[columnId]?.title);

  const createListHandler = () => {
    if (copyListName?.trim() === '') {
      setCopyListName('');
      return;
    }
    const columnListArray = Object.entries(columnList);
    const indexOfCurrentColumn = Object.keys(columnList).indexOf(columnId);

    const itemsCopy = [
      ...(columnListArray[indexOfCurrentColumn]?.[1].items as ITaskItem[]).map(
        elem => {
          return {
            id: uuidv4(),
            task: elem.task,
            members: elem.members,
            labels: elem.labels,
          };
        },
      ),
    ];

    const newColumn = [uuidv4(), { title: copyListName, items: itemsCopy }];

    columnListArray.splice(
      indexOfCurrentColumn + 1,
      0,
      newColumn as [
        string,
        {
          title: string;
          items: ITaskItem[];
        },
      ],
    );

    const result = Object.fromEntries(columnListArray);

    setColumnList(result);
    setColumnOrder(Object.keys(result));
    addTaskStorage(result);
    closeMainModal();
    onClose();
  };

  const onClickAndKeyPressHandler = (e: any) => {
    if (e.key === 'Escape') {
      setCopyListName('');
      onClose();
    }

    if (e.key === 'Enter' || e.type === 'click') {
      if (copyListName?.trim() === '') {
        setCopyListName('');
        return;
      }
      createListHandler();
      setCopyListName('');
      closeMainModal();
    }
  };

  return (
    <div>
      {!copyModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Copy list</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                setCopyListName(columnList[columnId]?.title);
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>

          <div className={styles.copy_container}>
            <div className={styles.input_container}>
              <div className={styles.title_input}>Name</div>
              <textarea
                className={styles.copy_input}
                value={copyListName}
                onChange={e => setCopyListName(e.target.value)}
                onKeyDown={e => {
                  onClickAndKeyPressHandler(e);
                }}
              />
            </div>
          </div>
          <span className={styles.create_button} onClick={createListHandler}>
            Create list
          </span>
        </ClickAway>
      )}
    </div>
  );
};

export default CopyListModal;
