import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Header from 'components/Header';
import Times from 'components/Times';
import Controller from 'components/Controller';
import Bubble from 'components/Bubble';
import TransitionsModal from 'components/Modal';
import styles from 'styles/Work.module.css';
import { VerificationModal } from 'views/VerificationModal';

const WorkPage: React.FC = (props) => {
  const router: any = useRouter();
  const defaultBreakLength = '5';

  const audioBeep: any = React.createRef();

  //state
  const [name, setName] = useState('みーたん！');
  const [defaultSessionLength, setDefaultSessionLength] = useState('25');
  const [isStart, setIsStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [timeLabel, setTimeLabel] = useState(name);
  const [settion, setSettion] = useState(true);
  const [timeLeftInSecond, setTimeLeftInSecond] = useState(Number.parseInt(defaultSessionLength, 10) * 60);
  const [breakLength, setBreakLength] = useState(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);
  //modal
  const [open, setOpen] = useState(false);

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
    setOpen(false);
    setPause(false);

    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
    timerInterval && clearInterval(timerInterval);
  };

  const onStartStop = () => {
    if (!isStart) {
      setIsStart(!isStart);
      setPause(false);
      setTimerInterval(
        setInterval(() => {
          decreaseTimer();
        }, 1000),
      );
    } else {
      audioBeep.current.pause();
      audioBeep.current.currentTime = 0;
      timerInterval && clearInterval(timerInterval);

      setPause(true);
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

  //Modal
  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
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
        <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audioBeep}></audio>
        {!settion && <Bubble />}
      </div>
      <VerificationModal open={open} handleModalClose={handleModalClose} onReset={onReset} name={timeLabel} />
      {/* mitan_bgimage_test */}
      <div className="bg_test">
        <div className="bg_test-text">みーたんもう少し上や！</div>
      </div>
    </>
  );
};

export default WorkPage;
