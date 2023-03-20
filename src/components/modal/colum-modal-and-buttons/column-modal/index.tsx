import { FC, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import listActionButtons from '@/data/list-action-buttons';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';
import ListButtonAction from '../list-button-actions';

type ColumnModalProps = {
  columnModal: boolean;
  onClose: () => void;
  columnId: string;
  setAddTaskSwitcher: Dispatch<SetStateAction<boolean>>;
};

const ColumnModal: FC<ColumnModalProps> = ({
  columnModal,
  onClose,
  columnId,
  setAddTaskSwitcher,
}) => {
  return (
    <div>
      {!columnModal ? null : (
        <ClickAway onClickAway={onClose} className={styles.container}>
          <div className={styles.title}>
            <h3>List actions</h3>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={e => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.x_icon}
            />
          </div>
          {listActionButtons.map((elem, index) => {
            return (
              <ListButtonAction
                key={Math.random() + index}
                columnId={columnId}
                switchKey={elem.key}
                action={
                  elem.key === 'Add'
                    ? () => {
                        setAddTaskSwitcher(true);
                        onClose();
                      }
                    : elem.action
                }
                hasBreakLine={elem.hasBreakLine}
                onClose={() => onClose()}
              >
                {elem.name}
              </ListButtonAction>
            );
          })}
        </ClickAway>
      )}
    </div>
  );
};

export default ColumnModal;
