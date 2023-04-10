import { FC, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ITaskItem } from '@/types/columns';
import { useAppContext } from '@/context';
import ClickAway from '@/components/outside-alerter';
import styles from './styles.module.scss';

type DescriptionProps = {
  item: ITaskItem;
  columnId: string;
};

const Description: FC<DescriptionProps> = ({ item, columnId }) => {
  const [inputModal, setInputModal] = useState<boolean>(false);

  const { onSaveHandler } = useAppContext();

  const [descriptionTaskName, setDescriptionTaskName] = useState(
    item.description,
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textAreaRef.current;

    textarea?.focus();
    textarea?.setSelectionRange(textarea.value.length, textarea.value.length);
  }, []);

  const onClickAndKeyPressHandler = (e: any) => {
    if (e.key === 'Escape' || e.type === 'click') {
      setDescriptionTaskName(item.description.trim());
      setInputModal(false);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.title_container}>
        <FontAwesomeIcon icon={faBars} className={styles.description_icon} />
        <h3 className={styles.description_activity}>Description</h3>
        {item.description && descriptionTaskName && !inputModal && (
          <div
            className={styles.edit_button}
            onClick={e => {
              setInputModal(true);
              e.stopPropagation();
            }}
          >
            Edit
          </div>
        )}
      </div>
      <div className={styles.input_container}>
        {!inputModal ? (
          <div
            className={
              descriptionTaskName
                ? styles.discription_text
                : styles.discription_input_button
            }
            onClick={e => {
              setInputModal(true);
              e.stopPropagation();
            }}
          >
            {descriptionTaskName || 'Add a more detailed description...'}
          </div>
        ) : (
          <ClickAway
            onClickAway={() => {
              onSaveHandler(
                columnId,
                item,
                descriptionTaskName,
                setDescriptionTaskName,
              );
              setInputModal(false);
            }}
            className={styles.input_buttons_container}
          >
            <textarea
              ref={textAreaRef}
              onKeyDown={e => {
                onClickAndKeyPressHandler(e);
              }}
              className={styles.input_area}
              value={descriptionTaskName}
              onChange={e => setDescriptionTaskName(e.target.value)}
              placeholder="Add a more detailed description..."
            />
            <div className={styles.save_button_container}>
              <div
                className={styles.save}
                onClick={e => {
                  onSaveHandler(
                    columnId,
                    item,
                    descriptionTaskName,
                    setDescriptionTaskName,
                  );
                  setInputModal(false);
                  e.stopPropagation();
                }}
              >
                Save
              </div>
              <div
                className={styles.cancel}
                onClick={e => {
                  onClickAndKeyPressHandler(e);
                  e.stopPropagation();
                }}
              >
                Cancel
              </div>
            </div>
          </ClickAway>
        )}
      </div>
    </div>
  );
};

export default Description;
