import { FC } from 'react';
import { ITaskItem } from '@/types/columns';
import { getColorById } from '@/utils/get-color-by-id';
import { useAppContext } from '@/context';
import { getLabelById } from '@/utils/get-label-by-id';
import styles from './styles.module.scss';

type ItemColorProps = {
  task: ITaskItem;
  isExpanded: boolean;
};
const ItemColor: FC<ItemColorProps> = ({ task, isExpanded }) => {
  const { labels } = useAppContext();

  return (
    <div>
      <div className={styles.priority_parent}>
        {task.labels?.map((labelId: string) => {
          const label = getLabelById(labels, labelId);

          const { colorId } = label;
          const color = getColorById(colorId);
          const { bgColor, forecolor } = color;
          return (
            <div key={color.id} className={styles.label_wrapper}>
              <div
                className={`${styles.label} ${
                  isExpanded ? styles.expanded : ''
                }`}
                style={{ background: isExpanded ? bgColor : forecolor }}
              >
                {isExpanded && (
                  <div
                    className={styles.dot}
                    style={{ background: forecolor }}
                  />
                )}
                {isExpanded && <p className={styles.text}>{label.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemColor;
