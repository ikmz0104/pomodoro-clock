import React from 'react';
import Header from 'components/Header';
import SimpleBottomNavigation from 'views/Navigation';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const actions = [
  { icon: <SpeedDialIcon />, name: 'Copy' },
  { icon: <SpeedDialAction />, name: 'Save' },
  { icon: <HomeRoundedIcon />, name: 'Print' },
  { icon: <AccessTimeIcon />, name: 'Share' },
];

const user = () => {
  return (
    <div className="container">
      <Header title="ユーザー" />
      <div className="content">
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<AccountCircleIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
      </div>
      <SimpleBottomNavigation />
    </div>
  );
};

export default user;
