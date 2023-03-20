import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { ITaskItem } from '@/types/columns';
import { useAppContext } from '@/context';
import styles from './styles.module.scss';
import DeleteModal from './delete-modal';

type MemberProps = {
  switecher: boolean;
  columnId: string;
  item: ITaskItem;
  onClose: () => void;
};

const DeleteButton: FC<MemberProps> = ({
  switecher,
  onClose,
  item,
  columnId,
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { columnList, setColumnList, addTaskStorage } = useAppContext();

  const removeTask = () => {
    const columnListArray = Object.entries(columnList);
    const currentItemIndex = Object.keys(columnList).indexOf(columnId);

    const remuveIndex =
      columnListArray[currentItemIndex]?.[1].items.indexOf(item) || 0;
    columnListArray[currentItemIndex]?.[1].items.splice(remuveIndex, 1);

    setColumnList(Object.fromEntries(columnListArray));
    addTaskStorage(Object.fromEntries(columnListArray));
  };

  return (
    <div>
      {!switecher ? null : (
        <>
          <div
            className={styles.button}
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
          >
            <FontAwesomeIcon
              icon={faRotateLeft}
              className={styles.reload_icon}
            />
            Send to board
          </div>
          <div
            className={styles.delete_button}
            onClick={() => setDeleteModal(true)}
          >
            <div className={styles.delete_icon}>━</div> Delete
          </div>
          <DeleteModal
            deleteModal={deleteModal}
            onClose={() => setDeleteModal(false)}
            removeTask={removeTask}
          />
        </>
      )}
    </div>
  );
};

export default DeleteButton;
