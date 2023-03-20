import { FC } from 'react';
import { IChecklistItem } from '@/types/checklists';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppContext } from '@/context';

import styles from './styles.module.scss';

type CheckItemProps = {
  checkItem: IChecklistItem[];
  columnId: string;
  taskId: string;
  checklistId: string;
};

const CheckItem: FC<CheckItemProps> = ({
  checkItem,
  columnId,
  taskId,
  checklistId,
}) => {
  const { onChange, onDeleteCheckItem } = useAppContext();

  return (
    <div className={styles.container}>
      <div>
        <input
          type="checkbox"
          checked={checkItem.isDone}
          className={styles.input}
          onChange={() => {
            onChange(columnId, taskId, checklistId, checkItem.id);
          }}
        />
      </div>
      <div className={styles.title}>
        <div>
          <p>{checkItem.label}</p>
        </div>
        <div>
          <DeleteOutlineIcon
            className={styles.icon}
            onClick={() =>
              onDeleteCheckItem(columnId, taskId, checklistId, checkItem.id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CheckItem;
