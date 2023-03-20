import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { ITaskItem } from '../../../../../types/columns';
import { IColor } from '../../../../../types/colors';
import { ILabel } from '../../../../../types/label';
import colors from '../../../../../data/colors';
import styles from './styles.module.scss';

type CreateLabelProps = {
  createColor: boolean;
  onClose: () => void;
  task: ITaskItem;
  columnId: string;
  // eslint-disable-next-line no-unused-vars
  onNewColorSelect: (label: ILabel) => void;
};

const CreateLabel: FC<CreateLabelProps> = ({
  createColor,
  onClose,
  onNewColorSelect,
}) => {
  const [pickedColor, setPickedColor] = useState<IColor>();
  const [text, setText] = useState('');

  const newLabelClick = (color: IColor) => {
    setPickedColor(color);
  };

  const onCreateHandler = () => {
    const label = {
      text,
      id: uuidv4(),
      colorId: pickedColor.id,
    };

    // eslint-disable-next-line no-unused-expressions
    pickedColor && onNewColorSelect(label);
    onClose();
  };

  return (
    <div>
      {!createColor ? null : (
        <div className={styles.label_overlay}>
          <div className={styles.label_container}>
            <div className={styles.label}>
              <p>Create label</p>
            </div>
            <div onClick={onClose} className={styles.icon}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className={styles.checked}>
            {pickedColor && (
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
            )}
          </div>
          <p>Title</p>
          <input
            type="text"
            className={styles.input_title}
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <p>Select s color</p>
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
          <div
            className={styles.remove_color}
            onClick={() => {
              setPickedColor('');
            }}
          >
            <p>X Remove color</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.create_btn}>
            <button onClick={() => onCreateHandler()}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateLabel;
