import Image from 'next/image';
import React, { FC } from 'react';
import styles from './styles.module.scss';

const Navbar: FC = () => {
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.logo_wrapper}>
          <Image
            src="/assets/logo_navbar.png"
            alt=""
            height={40}
            width={40}
            className={styles.img_logo}
          />
          <div className={styles.logo_name}>TMS</div>
        </div>
        <Image
          src="/assets/avatar.png"
          alt=""
          height={45}
          width={45}
          className={styles.avatar}
        />
      </div>
    </>
  );
};

export default Navbar;
