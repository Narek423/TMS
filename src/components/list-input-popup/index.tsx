import { useAppContext } from '@/context';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ClickAway from '../outside-alerter';
import styles from './styles.module.scss';

type ListInputPopupProps = {
  setListPopup: Dispatch<SetStateAction<boolean>>;
};

const ListInputPopup: FC<ListInputPopupProps> = props => {
  const [title, setTitle] = useState('');

  const { addColumn } = useAppContext();

  document.getElementById('listInput')?.focus();

  const handlerKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitle('');
      props.setListPopup(false);
    }
    if (!title.trim()) {
      setTitle('');
      return;
    }
    if (e.key === 'Enter') {
      addColumn({ [uuidv4()]: { title, items: [] } });
      setTitle('');
      props.setListPopup(true);
    }
  };

  const addListButtonHandler = () => {
    if (!title.trim()) {
      setTitle('');
      return;
    }
    addColumn({ [uuidv4()]: { title, items: [] } });
    setTitle('');
    props.setListPopup(true);
  };

  return (
    <ClickAway
      onClickAway={() => props.setListPopup(false)}
      className={styles.main_wrapper}
    >
      <div>
        <input
          id="listInput"
          onChange={e => setTitle(e.target.value)}
          value={title}
          autoFocus
          onKeyDown={e => {
            handlerKeyPress(e);
          }}
        />
        <div className={styles.button_container}>
          <div className={styles.add_button} onClick={addListButtonHandler}>
            Add list
          </div>
          <span
            className={styles.x_button}
            onClick={() => {
              props.setListPopup(false);
              setTitle('');
            }}
          >
            ✕
          </span>
        </div>
      </div>
    </ClickAway>
  );
};

export default ListInputPopup;
