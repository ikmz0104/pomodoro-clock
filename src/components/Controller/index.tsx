import React from 'react';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { RoundButton } from '../RoundButton';
import styles from './index.module.css';

type PropsOptional = {
  onStartStop: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleModalOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isStart: boolean;
  pause: boolean;
};

const Controller: React.FC<PropsOptional> = ({ onStartStop, onReset, isStart, pause, handleModalOpen }) => {
  const startIcon = <PlayArrowOutlinedIcon />;
  const pauseIcon = <PauseOutlinedIcon />;

  return (
    <div className={styles.controller}>
      <RoundButton onClick={onStartStop} isStart={isStart}>
        {!isStart ? startIcon : pauseIcon}
      </RoundButton>
      {pause && (
        <RoundButton isStart={isStart} onClick={handleModalOpen}>
          <StopRoundedIcon />
        </RoundButton>
      )}
    </div>
  );
};

export default Controller;
