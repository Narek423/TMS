import ClickAway from '@/components/outside-alerter';
import { useAppContext } from '@/context';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './styles.module.scss';

type ColumnInputProps = {
  setTitleInputSwitcher: Dispatch<SetStateAction<boolean>>;
  columnTitle: string;
  providedDrag: any;
  columnId: string;
};

const ColumnInput: FC<ColumnInputProps> = ({
  setTitleInputSwitcher,
  columnTitle,
  providedDrag,
  columnId,
}) => {
  const [title, setTitle] = useState(columnTitle);

  const copyTitle = columnTitle;

  const { columnList, setColumnList, addTaskStorage } = useAppContext();

  document.getElementById('listInput')?.focus();

  const changeTitleHandler = () => {
    const columnListCopy = { ...columnList };

    if (!columnListCopy[columnId]?.title) return;

    if (!title.trim()) {
      columnListCopy[columnId]!.title = copyTitle;
    } else {
      columnListCopy[columnId]!.title = title;
    }

    setColumnList(columnListCopy);
    addTaskStorage(columnListCopy);

    setTitleInputSwitcher(false);
  };

  const handlerKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!title.trim()) {
      return;
    }
    if (e.key === 'Enter' || e.key === 'Escape') {
      setTitleInputSwitcher(false);
      changeTitleHandler();
    }
  };

  return (
    <ClickAway
      onClickAway={changeTitleHandler}
      {...providedDrag.dragHandleProps}
      className={styles.main_wrapper}
    >
      <input
        id="listInput"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onChange={e => setTitle(e.target.value)}
        value={title}
        autoFocus
        onKeyDown={e => {
          handlerKeyPress(e);
        }}
      />
    </ClickAway>
  );
};

export default ColumnInput;
