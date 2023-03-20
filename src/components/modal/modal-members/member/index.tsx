import { FC } from 'react';
import { useAppContext } from '@/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import users from '../../../../data/users';
import styles from './styles.module.scss';

type MemberProps = {
  member: boolean;
  onClose: () => void;
  taskId: string;
  columnId: string;
};

const Member: FC<MemberProps> = ({ member, onClose, columnId, taskId }) => {
  const { addMember } = useAppContext();

  return (
    <div>
      {!member ? null : (
        <div className={styles.member_overlay}>
          <div className={styles.member_container}>
            <div className={styles.member}>
              <p>Members</p>
            </div>
            <div onClick={onClose} className={styles.icon}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div>
            <input className={styles.input_user} placeholder="Search members" />
            <p className={styles.board}>Board members</p>
            {users.map(user => {
              return (
                <div
                  key={user.id}
                  className={styles.member_user}
                  onClick={() => {
                    addMember(columnId, taskId, user);
                  }}
                >
                  <div className={styles.avatar}>
                    {user.avatar ? null : user.name[0]}
                  </div>
                  <div>{user.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Member;
