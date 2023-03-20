import { FC, useState } from 'react';
import { ITaskItem } from '@/types/columns';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { IChecklistItem } from '@/types/checklists';
import AddCheckItemForm from '../add-checkItem-form';
import styles from './styles.module.scss';
import CheckItem from '../checkItem';

type ChecklistTaskProps = {
  task: ITaskItem;
  columnId: string;
  checklist: IChecklistItem[];
  checkItems: IChecklistItem[];
  // eslint-disable-next-line no-unused-vars
  deleteChecklist: (colId: string, text: string, checklistId: string) => void;
};

const ChecklistTask: FC<ChecklistTaskProps> = ({
  task,
  columnId,
  deleteChecklist,
  checklist,
}) => {
  const [addItemChecklist, setAddItemChecklist] = useState<boolean>(false);
  const complated = checklist.checkItems.filter(
    checkItem => checkItem.isDone,
  ).length;
  const items = `${
    checklist.checkItems.length !== 0 ? checklist.checkItems.length : 1
  }`;
  const percent = `${(complated / items) * 100}%`;

  return (
    <div>
      <div>
        <div className={styles.title}>
          <span>
            <CheckBoxOutlinedIcon className={styles.title_icon} />
          </span>
          <div className={styles.checklist_title}>
            <div className={styles.title_text}>{checklist.title}</div>
            <div className={styles.title_delete}>
              <button
                className={styles.title_delete_btn}
                onClick={() => deleteChecklist(columnId, task.id, checklist.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className={styles.checklist_progress}>
          <span className={styles.percent}>
            {`${Math.round((complated / items) * 100)}%`}
          </span>
          <div className={styles.percent_line}>
            <div
              className={styles.percent_line_div}
              style={{
                width: percent,
              }}
            ></div>
          </div>
        </div>

        <div>
          {checklist.checkItems.map(checkItem => {
            return (
              <div key={checkItem.id}>
                <CheckItem
                  columnId={columnId}
                  taskId={task.id}
                  checkItem={checkItem}
                  checklistId={checklist.id}
                />
              </div>
            );
          })}
        </div>

        <div>
          {!addItemChecklist ? (
            <div className={styles.add_item}>
              <button
                className={styles.add_item_btn}
                onClick={() => {
                  setAddItemChecklist(true);
                }}
              >
                Add an item
              </button>
            </div>
          ) : (
            <AddCheckItemForm
              onClose={() => setAddItemChecklist(false)}
              columnId={columnId}
              taskId={task.id}
              checklistId={checklist.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChecklistTask;
