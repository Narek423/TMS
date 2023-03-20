import Image from 'next/image';
import { useState, FC, Dispatch, SetStateAction } from 'react';
import ColumnModal from '../modal/colum-modal-and-buttons/column-modal';
import styles from './styles.module.scss';

type ImageThreeButtonProps = {
  columnId: string;
  setAddTaskSwitcher: Dispatch<SetStateAction<boolean>>;
};

const ImageThreeButton: FC<ImageThreeButtonProps> = ({
  columnId,
  setAddTaskSwitcher,
}) => {
  const [modalSwitcher, setModalSwitcher] = useState<boolean>(false);

  return (
    <div className={styles.main_wrapper}>
      <Image
        className={styles.pontsIcons}
        src="/assets/3point_icon.svg"
        alt=""
        height={23}
        width={23}
        onClick={e => {
          setModalSwitcher(true);
          e.stopPropagation();
        }}
      />
      {modalSwitcher && (
        <ColumnModal
          onClose={() => setModalSwitcher(false)}
          setAddTaskSwitcher={setAddTaskSwitcher}
          columnModal={modalSwitcher}
          columnId={columnId}
        />
      )}
    </div>
  );
};
export default ImageThreeButton;
