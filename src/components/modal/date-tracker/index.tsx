import { FC, useState } from 'react';
import { ITaskItem } from '@/types/columns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dateChecker from '@/utils/date-cheker';
import { useAppContext } from '@/context';
import styles from './styles.module.scss';
import DateModal from '../date-modal';

type DateTrackerProps = {
  item: ITaskItem;
  columnId: string;
};

const DateTracker: FC<DateTrackerProps> = ({ item, columnId }) => {
  const [disableTroggl, setDisableTroggl] = useState<boolean>(
    item.date.checked,
  );
  const [dateModal, setDateModal] = useState<boolean>(false);

  const { saveDate } = useAppContext();

  const lablePicker = (date: (string | number)[]) => {
    if (date[1] === undefined) return null;

    if (disableTroggl) {
      return <div className={styles.due_date_complete}>complete</div>;
    }
    if (date[1] < 0) {
      return <div className={styles.due_date_overdue}>overdue</div>;
    }
    if (date[1] === 0) {
      return <div className={styles.due_date_soon}>due soon</div>;
    }
    return null;
  };

  return (
    <>
      <div className={styles.due_date_container}>
        <input
          type="checkbox"
          className={styles.check_box}
          checked={disableTroggl}
          onChange={() => {
            setDisableTroggl(!disableTroggl);
            saveDate(columnId, item, disableTroggl);
          }}
        />
        <div
          className={styles.tracker_button}
          onClick={() => setDateModal(true)}
        >
          <div>{dateChecker(item.date.title)[0]}</div>
          {lablePicker(dateChecker(item.date.title))}
          <ExpandMoreIcon fontSize="small" />
        </div>
      </div>
      {dateModal && (
        <div className={styles.modal_wrapper}>
          <DateModal
            item={item}
            columnId={columnId}
            onClose={() => setDateModal(false)}
            dateModal={dateModal}
          />
        </div>
      )}
    </>
  );
};

export default DateTracker;
