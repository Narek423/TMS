import ClickAway from '@/components/outside-alerter';
import { SetStateAction, Dispatch, useState, FC } from 'react';
import styles from './styles.module.scss';

type CardFromProps = {
  setAddTask: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  onAdd: (text: string) => void;
};

const CardForm: FC<CardFromProps> = ({ onAdd, setAddTask }) => {
  const [text, setText] = useState<string>('');

  document.getElementById('cardInput')?.focus();

  const onClickAndKeyPressHandler = (e: any) => {
    if (e.key === 'Escape') {
      setText('');
      setAddTask(false);
    }
    if (!text.trim()) {
      setText('');
      return;
    }
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      onAdd(text);
      setText('');
    }
  };

  return (
    <ClickAway onClickAway={() => setAddTask(false)}>
      <div>
        <input
          autoFocus
          id="cardInput"
          className={styles.input}
          type="text"
          placeholder="Enter a title for this card ..."
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          onKeyDown={e => {
            onClickAndKeyPressHandler(e);
          }}
        />
        <div>
          <button
            className={styles.btn_add_card}
            onClick={e => {
              onClickAndKeyPressHandler(e);
            }}
          >
            Add card
          </button>
          <button
            className={styles.btn_delete_card}
            onClick={e => {
              e.preventDefault();
              setAddTask(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    </ClickAway>
  );
};

export default CardForm;
