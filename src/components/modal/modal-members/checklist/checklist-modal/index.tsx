import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.scss';

type ChecklistProps = {
  openChecklist: boolean;
  onCloseChecklist: () => void;
  columnId: string;
  taskId: string;
  // eslint-disable-next-line no-unused-vars
  onAdd: (columnId: string, taskId: string, checklistTitle: string) => void;
};

const CheckList: FC<ChecklistProps> = ({
  openChecklist,
  onCloseChecklist,
  onAdd,
  columnId,
  taskId,
}) => {
  const [checklistTitle, setChecklistTitle] = useState<string>('');

  return (
    <div>
      {!openChecklist ? null : (
        <div className={styles.checklist_overlay}>
          <div className={styles.checklist_container}>
            <div className={styles.checklist}>
              <p>Add checklist</p>
            </div>
            <div onClick={onCloseChecklist} className={styles.icon}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <p className={styles.title}>Title</p>
          <div>
            <input
              className={styles.input_user}
              autoFocus
              type="text"
              value={checklistTitle}
              onChange={e => {
                setChecklistTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <select className={styles.select}>
              <optgroup className={styles.opytgroup}>
                <option>(none)</option>
              </optgroup>
            </select>
          </div>
          <button
            className={styles.btn_add}
            onClick={e => {
              e.preventDefault();
              onAdd(columnId, taskId, checklistTitle);
              setChecklistTitle('');
              onCloseChecklist();
            }}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckList;
