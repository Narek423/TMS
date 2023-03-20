import { useAppContext } from '@/context';
import { FC, Dispatch, SetStateAction } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CardForm from '../cards/card-from';
import styles from './styles.module.scss';

type AddCardProps = {
  columnId: string;
  addTaskSwitcher: boolean;
  setAddTaskSwitcher: Dispatch<SetStateAction<boolean>>;
};

const AddCard: FC<AddCardProps> = ({
  columnId,
  setAddTaskSwitcher,
  addTaskSwitcher,
}) => {
  const { addTask } = useAppContext();

  return (
    <div>
      {!addTaskSwitcher ? (
        <div
          className={styles.add_a_card}
          onClick={e => {
            setAddTaskSwitcher(true);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AddIcon /> Add a card
        </div>
      ) : (
        <CardForm
          onAdd={text => {
            addTask(columnId, text);
          }}
          setAddTask={setAddTaskSwitcher}
        />
      )}
    </div>
  );
};
export default AddCard;
