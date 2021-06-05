import React from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const home_icon = <HomeRoundedIcon color="primary" fontSize="large" />;
const work_icon = <CreateRoundedIcon color="primary" fontSize="large" />;

const Navigations = [
  {
    label: 'ホーム',
    value: '/',
    icon: home_icon,
  },
  {
    label: '作業',
    value: 'work',
    icon: work_icon,
  },
];

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState('');
  const router = useRouter();

  const handleChange = (event, newValue) => {
    if (newValue === 'profile') {
      window.location.href = 'https://liff.line.me/1654158503-QA41dovp';
    } else {
      router.push(`${newValue}`);
    }
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} showLabels className={styles.root}>
      {Navigations.map((item) => (
        <BottomNavigationAction label={item.label} value={item.value} icon={item.icon} />
      ))}
    </BottomNavigation>
  );
}
