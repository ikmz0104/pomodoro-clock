import React from 'react';
import styles from './index.module.css';
import CustomButton from '../Button';

type PropsOptional = {
  onStartStop: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isStart: boolean;
};

const Controller: React.FC<PropsOptional> = ({ onStartStop, onReset, isStart }) => {
  return (
    <div className={styles.controller}>
      <CustomButton
        id="start-stop"
        style={{
          fontSize: '14px',
          background: '#40a6f1',
          alignSelf: 'center',
          // boxShadow: '0 2px 5px 1px #A4D2FF',
        }}
        onClick={onStartStop}
      >
        {isStart ? 'Stop' : 'Start'}
      </CustomButton>
      <CustomButton
        id="reset"
        style={{
          fontSize: '14px',
          background: '#40a6f1',
          alignSelf: 'center',
          // boxShadow: '0 2px 5px 1px #A4D2FF',
        }}
        onClick={onReset}
      >
        Reset
      </CustomButton>
    </div>
  );
};

export default Controller;
