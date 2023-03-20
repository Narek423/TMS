import { useAppContext } from '@/context';
import { FC, ReactNode, useState } from 'react';
import CopyListModal from '../copy-list-modal';
import MoveAllCardsModal from '../move-all-cards';
import MoveListModal from '../move-list-modal';
import styles from './styles.module.scss';

type ListButtonActionProps = {
  columnId: string;
  onClose: () => void;
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  action: (arg: any) => void;
  hasBreakLine: boolean;
  switchKey: string;
};

const ListButtonAction: FC<ListButtonActionProps> = ({
  children,
  columnId,
  action,
  onClose,
  hasBreakLine,
  switchKey,
}) => {
  const { columnList, setColumnList, addTaskStorage, setColumnOrder } =
    useAppContext();

  const [modal, setModal] = useState<boolean>(false);

  const switchCaseModal = (arg: string) => {
    switch (arg) {
      case 'Move list':
        return (
          <MoveListModal
            moveModal={modal}
            onClose={() => setModal(false)}
            columnId={columnId}
            closeMainModal={onClose}
          />
        );

      case 'Copy':
        return (
          <CopyListModal
            copyModal={modal}
            onClose={() => setModal(false)}
            closeMainModal={onClose}
            columnId={columnId}
          />
        );

      case 'Move all':
        return (
          <MoveAllCardsModal
            moveAllCards={modal}
            onClose={() => setModal(false)}
            columnId={columnId}
            closeMainModal={onClose}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={styles.button_copy_list}
        onClick={e => {
          action({
            columnId,
            columnList,
            setColumnList,
            addTaskStorage,
            setColumnOrder,
            onClose,
          });
          e.stopPropagation();
          setModal(true);
        }}
      >
        {children}
      </div>
      {modal && switchCaseModal(switchKey)}
      {hasBreakLine && <hr />}
    </>
  );
};
export default ListButtonAction;
