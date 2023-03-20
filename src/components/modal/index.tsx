import { useState, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ITaskItem } from '@/types/columns';
// import { IChecklist } from '@/types/checklists';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import VideoLabelOutlinedIcon from '@mui/icons-material/VideoLabelOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { useAppContext } from '@/context';
import ModalColor from '@/components/modal/priority-color/modal-color';
import Avatar from './avatar';
import Actions from './actions';
import Member from './modal-members/member';
import Label from './modal-members/label';
import CheckList from './modal-members/checklist/checklist-modal';
import ChecklistItem from './modal-members/checklist/checklist-item-form';
import styles from './styles.module.scss';
import Description from './description';
import MoveModal from './actions/actions-modal/move-modal';
import ClickAway from '../outside-alerter';
import DateModal from './date-modal';
import DateTracker from './date-tracker';

type ModalProps = {
  openModal: boolean;
  onClose: () => void;
  task: ITaskItem;
  columnId: string;
};

const Modal: FC<ModalProps> = ({ openModal, onClose, task, columnId }) => {
  const [member, setMember] = useState<boolean>(false);
  const [modalLabel, setModalLabel] = useState<boolean>(false);
  const [openChecklist, setOpenChecklist] = useState<boolean>(false);

  const [dateModal, setDateModal] = useState<boolean>(false);
  const [moveModal, setMoveModal] = useState<boolean>(false);

  const { columnList, onAddChecklist, deleteChecklist } = useAppContext();
  return (
    <div>
      {openModal && (
        <div className={styles.overlay}>
          <ClickAway
            onClickAway={() => {
              onClose();
              setDateModal(false);
              setMoveModal(false);
            }}
            className={styles.modal_container}
          >
            <div className={styles.modal_head}>
              <div>
                <input
                  value={task.task}
                  onChange={e => e.target}
                  className={styles.title_input}
                />
              </div>
              <div onClick={onClose} className={styles.close_modal}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <div className={styles.move_modal_link}>
              in list{' '}
              <div
                onClick={e => {
                  setMoveModal(true);
                  e.stopPropagation();
                }}
              >
                {columnList[columnId]?.title}
              </div>{' '}
              <div className={styles.move_modal_position}>
                {moveModal && (
                  <MoveModal
                    item={task}
                    columnId={columnId}
                    onClose={() => setMoveModal(false)}
                    moveModal={moveModal}
                  />
                )}
              </div>
            </div>
            <div className={styles.modal_col}>
              <div className={styles.description}>
                <div className={styles.avatar_member}>
                  <div>
                    <div>
                      {task.members.length > 0 && (
                        <p className={styles.avatar_member_title}>Members</p>
                      )}
                    </div>
                    <div className={styles.avatar}>
                      <Avatar task={task} />
                    </div>
                  </div>
                  <div className={styles.colors}>
                    <div>
                      {task?.labels?.length > 0 && (
                        <p className={styles.priority_member_title}>Labels</p>
                      )}
                    </div>
                    <div>
                      <ModalColor task={task} />
                    </div>
                  </div>
                  {task?.date?.title && (
                    <div className={styles.colors}>
                      <div>
                        <p className={styles.priority_member_title}>Due date</p>
                      </div>
                      <div>
                        <DateTracker columnId={columnId} item={task} />
                      </div>
                    </div>
                  )}
                </div>
                <Description columnId={columnId} item={task} />
                <ChecklistItem
                  columnId={columnId}
                  task={task}
                  deleteChecklist={deleteChecklist}
                />
                <div>
                  <div className={styles.modal_col}>
                    <FormatListBulletedOutlinedIcon
                      className={styles.description_icon}
                    />
                    <span className={styles.description_activity}>
                      Activity
                    </span>
                  </div>
                  <div>
                    <input className={styles.activity_input} />
                  </div>
                </div>
              </div>
              <div className={styles.add_to_card}>
                <p className={styles.add_to_card_text}>Add to card</p>
                <div>
                  <div
                    className={styles.member}
                    onClick={() => setMember(true)}
                  >
                    <PermIdentityOutlinedIcon className={styles.icon_member} />
                    <span className={styles.btn_member}>Members</span>
                  </div>
                  <Member
                    member={member}
                    columnId={columnId}
                    taskId={task.id}
                    onClose={() => setMember(false)}
                  />
                </div>
                <div>
                  <div
                    className={styles.member}
                    onClick={() => setModalLabel(true)}
                  >
                    <TurnedInNotOutlinedIcon className={styles.icon_member} />
                    <span className={styles.btn_member}>Labels</span>
                  </div>
                  <Label
                    modalLabel={modalLabel}
                    columnId={columnId}
                    task={task}
                    onClose={() => setModalLabel(false)}
                    label={false}
                  />
                </div>
                <div>
                  <div
                    className={styles.member}
                    onClick={() => setOpenChecklist(true)}
                  >
                    <CheckBoxOutlinedIcon className={styles.icon_member} />
                    <span className={styles.btn_member}>Checklist</span>
                  </div>
                  <CheckList
                    openChecklist={openChecklist}
                    columnId={columnId}
                    taskId={task.id}
                    onCloseChecklist={() => setOpenChecklist(false)}
                    onAdd={onAddChecklist}
                  />
                </div>
                <div
                  onClick={e => {
                    setDateModal(true);
                    e.stopPropagation();
                  }}
                  className={styles.member}
                >
                  <QueryBuilderOutlinedIcon className={styles.icon_member} />
                  <span className={styles.btn_member}>Dates</span>
                  {dateModal && (
                    <DateModal
                      item={task}
                      columnId={columnId}
                      onClose={() => setDateModal(false)}
                      dateModal={dateModal}
                    />
                  )}
                </div>
                <div className={styles.member}>
                  <div>
                    <AttachFileOutlinedIcon className={styles.icon_member} />
                    <span className={styles.btn_member}>Attechment</span>
                  </div>
                </div>
                <div className={styles.member}>
                  <div>
                    <VideoLabelOutlinedIcon className={styles.icon_member} />
                    <span className={styles.btn_member}>Cover</span>
                  </div>
                </div>
                <Actions columnId={columnId} item={task} />
              </div>
            </div>
          </ClickAway>
        </div>
      )}
    </div>
  );
};

export default Modal;
