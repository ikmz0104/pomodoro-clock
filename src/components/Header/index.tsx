import React from 'react';
import Link from 'next/link';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './index.module.css';
import { auth } from '../../../lib/db';
import { useRouter } from 'next/router';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

type PropsOptional = {
  title: string;
};

const Header: React.FC<PropsOptional> = ({ title }) => {
  const router = useRouter();
  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.topnav}>
      {router.pathname === '/' ? (
        <ExitToAppRoundedIcon onClick={logOut} className={styles.logout_icon} />
      ) : (
        <Link href="/">
          <a>
            <HomeRoundedIcon color="secondary" />
          </a>
        </Link>
      )}
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
