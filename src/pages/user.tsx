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

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';

const actions = [
  { icon: <SpeedDialIcon />, name: 'Copy' },
  { icon: <SpeedDialAction />, name: 'Save' },
  { icon: <HomeRoundedIcon />, name: 'Print' },
  { icon: <AccessTimeIcon />, name: 'Share' },
];

const user = () => {
  const theme = useTheme();
  return (
    <div className="container">
      <Header title="ユーザー" />
      <div className="content">
        <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Mac Miller
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="previous">{theme.direction === 'rtl' ? <AccessTimeIcon /> : <AccessTimeIcon />}</IconButton>
              <IconButton aria-label="play/pause">
                <AccessTimeIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">{theme.direction === 'rtl' ? <AccessTimeIcon /> : <AccessTimeIcon />}</IconButton>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
        </Card>

        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={<AccountCircleIcon />} />}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
            ))}
          </SpeedDial>
        </Box>
      </div>
      <SimpleBottomNavigation />
    </div>
  );
};

export default user;
