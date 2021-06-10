import React from 'react';
import Lottie from 'react-lottie-player';
import breaklottie from 'util/lottie/coffee_break.json';
import styles from './index.module.css';
import { theme } from 'util/theme';

const formatTime = (timeLeftInSecond: number) => {
  let minute: any = Math.floor(timeLeftInSecond / 60);
  if (minute < 10) minute = '0' + minute;

  let second: any = timeLeftInSecond - 60 * minute;
  if (second < 10) second = '0' + second;

  return `${minute}:${second}`;
};

type PropsOptional = {
  timeLabel: string;
  session: boolean;
  timeLeftInSecond: number;
};

const Times: React.FC<PropsOptional> = ({ timeLabel, session, timeLeftInSecond }) => {
  return (
    <div className={styles.times}>
      <div className={session ? styles['times-content-wrapper'] : styles['break_time-content-wrapper']}>
        {session ? ( //Session中の表示
          <div className={styles['times-content']}>
            <label id="timer-label" className={styles['timer-label']}>
              {timeLabel}
            </label>
            <span id="time-left" className={styles['time-left']}>
              {formatTime(timeLeftInSecond)}
            </span>
          </div>
        ) : (
          //休憩中
          <div className={styles['break_time-content']}>
            <span id="time-left" className={styles['break_time-left']}>
              {formatTime(timeLeftInSecond)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Times;
