import { FC } from 'react';
import { ITaskItem } from '@/types/columns';
import { useAppContext } from '@/context';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dateChecker from '@/utils/date-cheker';
import styles from './styles.module.scss';

type DueIndicatorProps = {
  item: ITaskItem;
  columnId: string;
};

const DueIndicator: FC<DueIndicatorProps> = ({ item, columnId }) => {
  const { saveDate } = useAppContext();

  const indicatorColor = dateChecker(item.date.title)[1];

  const lablePicker = (date: any) => {
    if (date === undefined) return styles.main_wrapper_white;

    if (item.date.checked) {
      return styles.main_wrapper_green;
    }
    if (date < 0) {
      return styles.main_wrapper_red;
    }
    if (date === 0) {
      return styles.main_wrapper_yellow;
    }
    return styles.main_wrapper_white;
  };

  return (
    <div
      className={lablePicker(indicatorColor)}
      onClick={e => {
        saveDate(columnId, item, item.date.checked);
        e.stopPropagation();
      }}
    >
      <AccessTimeIcon className={styles.watch_icon} />
      <input
        type="checkbox"
        className={styles.check_box}
        checked={item.date.checked}
        onChange={e => {
          e.stopPropagation();
        }}
      />
      <div className={styles.due_date}>{`${new Date(
        item.date.title,
      ).toLocaleString('default', {
        month: 'short',
      })} ${item.date.title.slice(-2)}`}</div>
    </div>
  );
};

export default DueIndicator;
