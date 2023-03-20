import { FC } from 'react';
import { ITaskItem } from '@/types/columns';
import { getColorById } from '@/utils/get-color-by-id';
import { useAppContext } from '@/context';
import { getLabelById } from '@/utils/get-label-by-id';
import styles from './styles.module.scss';

type PriorityProps = {
  task: ITaskItem;
};

const ModalColor: FC<PriorityProps> = ({ task }) => {
  const { labels } = useAppContext();
  return (
    <div>
      <div className={styles.priority_parent}>
        {task.labels.map((labelId: string) => {
          const label = getLabelById(labels, labelId);

          const { colorId } = label;
          const color = getColorById(colorId);
          const { bgColor, forecolor } = color;
          return (
            <div key={color.id}>
              <div className={styles.priority} style={{ background: bgColor }}>
                <div
                  className={styles.priority_child}
                  style={{ background: forecolor }}
                ></div>
                <p className={styles.text}>{label.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModalColor;
