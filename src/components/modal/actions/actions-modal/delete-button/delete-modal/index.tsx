import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type DeleteModalProps = {
  deleteModal: boolean;
  onClose: () => void;
  removeTask: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({
  deleteModal,
  onClose,
  removeTask,
}) => {
  return (
    <div>
      {!deleteModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>Delete card ?</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>

          <div className={styles.text}>
            All actions will be removed from the activity feed and you won’t be
            able to re-open the card. There is no undo.
          </div>

          <span className={styles.move_button} onClick={removeTask}>
            Delete
          </span>
        </ClickAway>
      )}
    </div>
  );
};

export default DeleteModal;
