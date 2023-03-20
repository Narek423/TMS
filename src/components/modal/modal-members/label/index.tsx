import { FC, useState } from 'react';
import { useAppContext } from '@/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { ITaskItem } from '../../../../types/columns';
import CreateLabel from './create-label';
import { getColorById } from '../../../../utils/get-color-by-id';
import Edit from './edit';
import styles from './styles.module.scss';

type LabelProps = {
  label: boolean;
  onClose: () => void;
  task: ITaskItem;
  columnId: string;
  modalLabel: any;
};

const Label: FC<LabelProps> = ({ modalLabel, onClose, task, columnId }) => {
  const [createColor, setCreateColor] = useState<boolean>(false);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { addLabel, labels, updateLabels, editLabel, deleteLabel } =
    useAppContext();

  const [edit, setEdit] = useState<{
    colorId: string;
    text: string;
    id: string;
  } | null>(null);

  const handleChange = (i: any) => {
    setIsChecked(task.labels.findIndex(label => label === i.id) !== -1);
  };

  return (
    <div>
      {!modalLabel ? null : (
        <div className={styles.label_overlay}>
          {edit && (
            <Edit
              edit={edit}
              onClose={() => setEdit(null)}
              labels={labels}
              editLabel={editLabel}
              deleteLabel={deleteLabel}
            />
          )}
          <CreateLabel
            createColor={createColor}
            columnId={columnId}
            task={task}
            onClose={() => setCreateColor(false)}
            onNewColorSelect={newLabel => {
              updateLabels([...labels, newLabel]);
            }}
          />
          <div className={styles.label_container}>
            <div className={styles.label}>
              <p>Label</p>
            </div>
            <div onClick={onClose} className={styles.icon}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div>
            <input
              className={styles.input_color}
              placeholder="Search labels..."
            />
          </div>
          <div>
            <p className={styles.ul_label}>Labels</p>
            <div>
              <ul>
                {labels.map(i => {
                  return (
                    <li key={i.id} className={styles.li}>
                      <div
                        className={styles.label_color}
                        onClick={() => {
                          addLabel(columnId, task.id, i);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            isChecked ||
                            task.labels.findIndex(label => label === i.id) !==
                              -1
                          }
                          onChange={() => handleChange(i)}
                          className={styles.checkbox}
                        />
                        <div className={styles.color_edit}>
                          <div
                            className={styles.background}
                            style={{
                              background: getColorById(i.colorId).bgColor,
                            }}
                          >
                            <div
                              className={`${styles.round_color}`}
                              style={{
                                background: getColorById(i.colorId).forecolor,
                              }}
                            ></div>
                            {i.text}
                          </div>
                          <div
                            className={styles.button_color}
                            onClick={e => {
                              e.stopPropagation();
                              setEdit({
                                colorId: i.colorId,
                                text: i.text,
                                id: i.id,
                              });
                            }}
                          >
                            <div>
                              <FontAwesomeIcon icon={faPen} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div
                className={styles.create_a_new_label}
                onClick={() => setCreateColor(true)}
              >
                <p>Create a new label</p>
              </div>
              <div className={styles.underline}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Label;
