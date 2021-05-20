import React, { Component } from 'react';
import styles from './index.module.css';
import { theme } from '../../util/theme';

const formatTime = (timeLeftInSecond: number) => {
  let minute: any = Math.floor(timeLeftInSecond / 60);
  if (minute < 10) minute = '0' + minute;

  let second: any = timeLeftInSecond - 60 * minute;
  if (second < 10) second = '0' + second;

  return `${minute}:${second}`;
};

type PropsOptional = {
  timeLabel: string;
  timeLeftInSecond: number;
};

const Times: React.FC<PropsOptional> = ({ timeLabel, timeLeftInSecond }) => {
  return (
    <div className={styles.times}>
      <div
        className={styles['times-content-wrapper']}
        style={{ background: timeLabel === 'Session' ? theme.wrapperColor.settion : theme.wrapperColor.break }}
      >
        <div className={styles['times-content']}>
          <label id="timer-label" className={styles['timer-label']}>
            {timeLabel}
          </label>
          <span id="time-left" className={styles['time-left']}>
            {formatTime(timeLeftInSecond)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Times;
