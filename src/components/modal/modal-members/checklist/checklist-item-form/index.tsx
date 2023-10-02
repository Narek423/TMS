import { FC } from 'react';
import { ITaskItem } from '@/types/columns';
import ChecklistTask from './checklist-task';

type ChecklistItemProps = {
  task: ITaskItem;
  columnId: string;
  // eslint-disable-next-line no-unused-vars
  deleteChecklist: (colId: string, text: string, checklistId: string) => void;
};

const ChecklistItem: FC<ChecklistItemProps> = ({
  task,
  columnId,
  deleteChecklist,
}) => {
  return (
    <div>
      {task.checklists?.map(checklist => {
        return (
          <div key={checklist.id}>
            <ChecklistTask
              columnId={columnId}
              deleteChecklist={deleteChecklist}
              checklist={checklist}
              task={task}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChecklistItem;
