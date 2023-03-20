import { FC, useState, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IColumn, ITaskItem } from '@/types/columns';
import ClickAway from '@/components/outside-alerter';
import DayPicker from 'react-daypicker';
import { useAppContext } from '@/context';
import convertType from '@/utils/convert-date-type';
import styles from './styles.module.scss';

import 'react-daypicker/lib/DayPicker.css';

type DateModalProps = {
  dateModal: boolean;
  onClose: () => void;
  columnId: string;
  item: ITaskItem;
};

const DateModal: FC<DateModalProps> = ({
  dateModal,
  onClose,
  item,
  columnId,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [disableTroggl, setDisableTroggl] = useState<boolean>(true);
  const [stringDate, setStringDate] = useState<string>(item.date.title);

  const { setColumnList, columnList, addTaskStorage } = useAppContext();

  const saveDate = (e: MouseEvent<HTMLElement>) => {
    const updatedItems = columnList[columnId]?.items?.map(elem => {
      if (elem.id === item.id) {
        return !disableTroggl
          ? { ...elem, date: { title: '', checked: false } }
          : {
              ...elem,
              date: {
                title: stringDate || convertType(startDate),
                checked: elem.date.checked,
              },
            };
      }
      return elem;
    });

    const updatedColumnList = {
      ...columnList,
      [columnId]: { ...columnList[columnId], items: updatedItems },
    } as IColumn;

    setColumnList(updatedColumnList);
    addTaskStorage(updatedColumnList);

    onClose();
    e.stopPropagation();
  };

  const removeDate = (e: MouseEvent<HTMLElement>) => {
    const updatedItems = columnList[columnId]?.items?.map(elem => {
      if (elem.id === item.id) {
        return { ...elem, date: { title: '', checked: false } };
      }
      return elem;
    });
    const updatedColumnList = {
      ...columnList,
      [columnId]: { ...columnList[columnId], items: updatedItems },
    } as IColumn;

    setColumnList(updatedColumnList);
    addTaskStorage(updatedColumnList);

    onClose();
    e.stopPropagation();
  };

  return !dateModal ? null : (
    <ClickAway onClickAway={onClose} className={styles.container}>
      <div className={styles.title}>
        <h3>Dates</h3>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.x_icon}
        />
      </div>
      <hr />
      <DayPicker
        value={startDate}
        onDayClick={(day: any) => {
          setStartDate(day);
          setStringDate('');
        }}
      />
      <div className={styles.due_date_title}>Due date</div>
      <div className={styles.due_date_input_container}>
        <input
          type="checkbox"
          className={styles.check_box}
          checked={disableTroggl}
          onChange={() => setDisableTroggl(!disableTroggl)}
        />
        {disableTroggl ? (
          <input
            className="into"
            type="date"
            disabled={!disableTroggl}
            value={stringDate || convertType(startDate)}
            onChange={e => {
              setStringDate(e.target.value);
            }}
          />
        ) : (
          <input
            className={styles.date_input_disabled}
            type="date"
            disabled={!disableTroggl}
            value=""
          />
        )}
      </div>
      <div className={styles.bottons_container}>
        <div className={styles.save_button} onClick={saveDate}>
          Save
        </div>
        <div className={styles.remove_button} onClick={removeDate}>
          Remove
        </div>
      </div>
    </ClickAway>
  );
};

export default DateModal;
