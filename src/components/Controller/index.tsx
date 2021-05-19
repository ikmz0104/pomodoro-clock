import React from 'react';
import styles from './index.module.css';

type PropsOptional = {
  onStartStop: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isStart: boolean;
};

const Controller: React.FC<PropsOptional> = ({ onStartStop, onReset, isStart }) => {
  return (
    <div className={styles.controller}>
      <button id="start_stop" onClick={onStartStop}>
        {isStart ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controller;
