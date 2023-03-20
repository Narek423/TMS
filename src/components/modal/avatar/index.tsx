import { FC } from 'react';
import { ITaskItem } from '@/types/columns';
import styles from './styles.module.scss';

type AvatarProps = {
  task: ITaskItem;
};

const Avatar: FC<AvatarProps> = ({ task }) => {
  return (
    <div>
      <div className={styles.avatar_parent}>
        {task?.members?.map(elem => {
          return (
            <div key={elem.id} className={styles.avatar}>
              {elem.name[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Avatar;
