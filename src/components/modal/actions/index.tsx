import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faArchive,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ITaskItem } from '@/types/columns';
import styles from './styles.module.scss';
import MoveModal from './actions-modal/move-modal';
import CopyModal from './actions-modal/copy-modal';
import DeleteButton from './actions-modal/delete-button';

type Button = {
  name: string;
  icon: any;
  modalSwitcher: Dispatch<SetStateAction<boolean>>;
}[];

type ActionsProps = {
  columnId: string;
  item: ITaskItem;
};

const Actions: FC<ActionsProps> = ({ columnId, item }) => {
  const [moveModal, setMoveModal] = useState<boolean>(false);
  const [copyModal, setCopyModal] = useState<boolean>(false);
  const [archiveDeleteButton, setArchiveDeleteButton] =
    useState<boolean>(false);

  const [buttons, setButtons] = useState<Button>([
    { name: 'Move', icon: faArrowRight, modalSwitcher: setMoveModal },
    { name: 'Copy', icon: faCopy, modalSwitcher: setCopyModal },
    { name: 'Archive', icon: faArchive, modalSwitcher: setArchiveDeleteButton },
  ]);

  const switchCaseModal = (arg: string) => {
    switch (arg) {
      case 'Move':
        return (
          <MoveModal
            moveModal={moveModal}
            onClose={() => setMoveModal(false)}
            columnId={columnId}
            item={item}
          />
        );

      case 'Copy':
        return (
          <CopyModal
            copyModal={copyModal}
            onClose={() => setCopyModal(false)}
            columnId={columnId}
            item={item}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.main_wrapper}>
      <h3>Actions</h3>
      {buttons.map((elem, index) => {
        return (
          <div key={index + Math.random()}>
            <div
              className={styles.button}
              onClick={e => {
                elem.modalSwitcher(true);
                if (elem.name === 'Archive')
                  setButtons(buttons.slice(0, buttons.length - 1));
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={elem.icon} className={styles.icon} />
              {elem.name}
            </div>

            {switchCaseModal(elem.name)}

            {archiveDeleteButton && elem.name === 'Copy' && (
              <DeleteButton
                switecher={archiveDeleteButton}
                onClose={() => {
                  setArchiveDeleteButton(false);
                  setButtons([
                    ...buttons,
                    {
                      name: 'Archive',
                      icon: faArchive,
                      modalSwitcher: setArchiveDeleteButton,
                    },
                  ]);
                }}
                columnId={columnId}
                item={item}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Actions;
