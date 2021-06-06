import React from 'react';
import Link from 'next/link';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './index.module.css';

type PropsOptional = {
  title: string;
};

const Header: React.FC<PropsOptional> = ({ title }) => {
  return (
    <div className={styles.topnav}>
      <Link href="/">
        <a>
          <HomeRoundedIcon color="secondary" />
        </a>
      </Link>
      <p>{title}</p>
      <Link href="/setting">
        <a>
          <SettingsIcon color="secondary" />
        </a>
      </Link>
    </div>
  );
};

export default Header;
