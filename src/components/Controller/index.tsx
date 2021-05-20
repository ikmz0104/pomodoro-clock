import React from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import styles from './index.module.css';
import CustomButton from '../Button';
import { RoundButton } from '../RoundButton';

type PropsOptional = {
  onStartStop: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isStart: boolean;
  timeLabel: string;
};

const Controller: React.FC<PropsOptional> = ({ onStartStop, onReset, isStart, timeLabel }) => {
  const startIcon = <PlayArrowOutlinedIcon />;
  const pauseIcon = <PauseOutlinedIcon />;
  return (
    <div className={styles.controller}>
      <RoundButton onClick={onStartStop} isStart={isStart}>
        {!isStart ? startIcon : pauseIcon}
      </RoundButton>
      <AutorenewOutlinedIcon onClick={onReset} className={styles.resetbutton} />
    </div>
  );
};

export default Controller;
