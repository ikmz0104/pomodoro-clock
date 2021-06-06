import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import styles from '../styles/Work.module.css';
import Times from '../components/Times';
import Controller from '../components/Controller';
import Bubble from '../components/Bubble';

const WorkPage: React.FC = (props) => {
  const router: any = useRouter();
  const defaultBreakLength = '5';

  const audioBeep: any = React.createRef();

  //state
  const [name, setName] = useState('Session');
  const [defaultSessionLength, setDefaultSessionLength] = useState('25');
  const [isStart, setIsStart] = useState(false);
  const [timeLabel, setTimeLabel] = useState(name);
  const [settion, setSettion] = useState(true);
  const [timeLeftInSecond, setTimeLeftInSecond] = useState(Number.parseInt(defaultSessionLength, 10) * 60);
  const [breakLength, setBreakLength] = useState(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);

  //最初のレンダリング時
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (router.query.name) {
      setName(router.query.name);
      setTimeLabel(router.query.name);
    }
    if (router.query.time) {
      setDefaultSessionLength(router.query.time);
      setTimeLeftInSecond(Number.parseInt(router.query.time, 10) * 60);
      setSessionLength(Number.parseInt(router.query.time, 10));
    }
  }, [router.isReady]);

  useEffect(() => {
    phaseControl();
  }, [timeLeftInSecond]);

  const onReset = () => {
    setBreakLength(Number.parseInt(defaultBreakLength, 10));
    setSessionLength(Number.parseInt(defaultSessionLength, 10));
    setTimeLabel(name);
    setTimeLeftInSecond(Number.parseInt(defaultSessionLength, 10) * 60);
    setIsStart(false);
    setTimerInterval(null);
    setSettion(true);

    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
    timerInterval && clearInterval(timerInterval);
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
      if (settion) {
        setTimeLabel('Break');
        setSettion(false);
        setTimeLeftInSecond(breakLength * 60);
      } else {
        setTimeLabel(name);
        setSettion(true);
        setTimeLeftInSecond(sessionLength * 60);
      }
    }
  };

  return (
    <>
      <Header title={timeLabel} />
      <div className={styles.container}>
        <div className={styles.label}>
          <p>{timeLabel}</p>
          <p>{defaultSessionLength}min</p>
        </div>
        <Times settion={settion} timeLeftInSecond={timeLeftInSecond} timeLabel={timeLabel} />
        <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} />
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audioBeep}></audio>
        {!settion && <Bubble />}
      </div>
    </>
  );
};

export default WorkPage;
