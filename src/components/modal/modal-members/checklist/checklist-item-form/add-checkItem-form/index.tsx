import { useAppContext } from '@/context';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

type AddCheckItemFormProps = {
  onClose: () => void;
  columnId: string;
  taskId: string;
  checklistId: string;
};

const AddCheckItemForm: FC<AddCheckItemFormProps> = ({
  onClose,
  columnId,
  taskId,
  checklistId,
}) => {
  const [itemText, setItemText] = useState<string>('');

  const { onAddCheckItem } = useAppContext();

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={itemText}
        onChange={e => {
          setItemText(e.target.value);
        }}
      />
      <div>
        <button
          className={styles.add}
          onClick={e => {
            onAddCheckItem(columnId, taskId, checklistId, itemText);
            e.preventDefault();
            setItemText('');
            onClose();
          }}
        >
          Add
        </button>
        <button className={styles.cencel} onClick={onClose}>
          Cencel
        </button>
      </div>
    </div>
  );
};

export default AddCheckItemForm;
