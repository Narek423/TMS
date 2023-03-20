import React, { FC, useState } from 'react';
import Dnd from '@/components/dnd';
import styles from './styles.module.scss';
import ListInputPopup from '../list-input-popup';
import Navbar from '../navbar';

const Hero: FC = () => {
  const [listPopup, setListPopup] = useState(false);

  return (
    <div className={styles.main_wrapper_bg}>
      <Navbar />
      <div className={styles.main_wrapper}>
        <Dnd />
        <div className={styles.popup_and_button}>
          {!listPopup ? (
            <div
              className={styles.list_button}
              onClick={e => {
                setListPopup(true);
                e.stopPropagation();
              }}
            >
              <span className={styles.plus_icon}>+</span> Add another list
            </div>
          ) : (
            <ListInputPopup setListPopup={setListPopup} />
          )}
        </div>
        <div
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="absolute bottom-8 right-10 bg-[#0079bf] rounded cursor-pointer hover:bg-slate-700 p-2 "
        >
          Clear all
        </div>
      </div>
    </div>
  );
};

export default Hero;
