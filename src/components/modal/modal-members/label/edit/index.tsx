import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ILabel } from '@/types/label';
import { ITaskItem } from '../../../../../types/columns';
import { IColor } from '../../../../../types/colors';
import colors from '../../../../../data/colors';
import styles from './styles.module.scss';

type EditLabelProps = {
  edit: { colorId: string; text: string; id: string };
  onClose: () => void;
  task: ITaskItem;
  columnId: string;
  // eslint-disable-next-line no-unused-vars
  editLabel: (label: ILabel) => void;
  // eslint-disable-next-line no-unused-vars
  deleteLabel: (lebels: ILabel[]) => void;
};

const EditLabel: FC<EditLabelProps> = ({
  edit,
  onClose,
  editLabel,
  deleteLabel,
}) => {
  const [pickedColorId, setPickedColorId] = useState<string>(edit.colorId);
  const [text, setText] = useState<string>(edit.text);
  const pickedColor = colors.find(i => i.id === pickedColorId);

  const newLabelClick = (color: IColor) => {
    setPickedColorId(color.id);
  };

  const onSaveHandler = () => {
    const updatedLabel = {
      text,
      colorId: pickedColor.id,
      id: edit.id,
    };
    editLabel(updatedLabel);
    onClose();
  };

  const onDeleteHandler = () => {
    deleteLabel(edit.id);

    onClose();
  };

  return (
    <div>
      {!edit ? null : (
        <div className={styles.label_overlay}>
          <div className={styles.label_container}>
            <div className={styles.label}>
              <p>Edit label</p>
            </div>
            <div onClick={onClose} className={styles.icon}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className={styles.checked}>
            <div
              className={styles.cloud}
              style={{ background: pickedColor.bgColor }}
            >
              <div
                className={styles.round_color}
                style={{ background: pickedColor.forecolor }}
              ></div>
              {text}
            </div>
          </div>
          <p>Title</p>
          <input
            type="text"
            value={text}
            className={styles.input_title}
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <p>Select a color</p>
          <div className={styles.add_new_color}>
            {colors.map((newcolor: IColor) => {
              const { forecolor, id } = newcolor;
              return (
                <div key={id} onClick={() => newLabelClick(newcolor)}>
                  <div
                    className={`${styles.color_newlabel}`}
                    style={{ background: forecolor }}
                  ></div>
                </div>
              );
            })}
          </div>
          <div className={styles.remove_color}>
            <p>X Remove color</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.save_delete_btn}>
            <button
              className={styles.save_button}
              onClick={() => onSaveHandler()}
            >
              Save
            </button>
            <button
              className={styles.delete_btn}
              onClick={() => onDeleteHandler()}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLabel;
