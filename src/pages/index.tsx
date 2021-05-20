import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Times from '../components/Times';
import Controller from '../components/Controller';

const Home: React.FC = (props) => {
  const defaultSessionLength = '1';
  const defaultBreakLength = '5';

  const audioBeep: any = React.createRef();

  //state
  const [isStart, setIsStart] = useState(false);
  const [timeLabel, setTimeLabel] = useState('Session');
  const [timeLeftInSecond, setTimeLeftInSecond] = useState(Number.parseInt(defaultSessionLength, 10) * 60);
  const [breakLength, setBreakLength] = useState(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    phaseControl();
  }, [timeLeftInSecond]);

  const onReset = () => {
    console.log('onReset');
  };

  const onStartStop = () => {
    if (!isStart) {
      setIsStart(!isStart);
      setTimerInterval(
        setInterval(() => {
          decreaseTimer();
        }, 1000),
      );
    } else {
      audioBeep.current.pause();
      audioBeep.current.currentTime = 0;
      timerInterval && clearInterval(timerInterval);

      setIsStart(!isStart);
      setTimerInterval(null);
    }
  };

  const decreaseTimer = () => setTimeLeftInSecond((preTimeLeftInSecond) => preTimeLeftInSecond - 1);

  const phaseControl = () => {
    if (timeLeftInSecond === 0) {
      audioBeep.current.play();
    } else if (timeLeftInSecond === -1) {
      if (timeLabel === 'Session') {
        setTimeLabel('Break');
        setTimeLeftInSecond(breakLength * 60);
      } else {
        setTimeLabel('Session');
        setTimeLeftInSecond(sessionLength * 60);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Times timeLabel={timeLabel} timeLeftInSecond={timeLeftInSecond} />
      <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} />
      <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audioBeep}></audio>
    </div>
  );
};

export default Home;
