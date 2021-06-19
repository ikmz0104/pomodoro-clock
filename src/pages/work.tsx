import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Times from 'components/Times';
import Controller from 'components/Controller';
import firebase from 'util/firebase';
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
  const [session, setSession] = useState(true);
  const [timeLeftInSecond, setTimeLeftInSecond] = useState(Number.parseInt(defaultSessionLength, 10) * 60);
  const [breakLength, setBreakLength] = useState(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);
  //modal
  const [open, setOpen] = useState(false);

  //最初のレンダリング時
  useEffect(() => {
    async function fetchData(id) {
      await Promise.all([getCategory(id)]);
    }
    if (!router.isReady) {
      return;
    }
    if (router.query.id) {
      fetchData(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    phaseControl();
  }, [timeLeftInSecond]);

  const getCategory = async (id) => {
    const category = await firebase.getCategory(id);
    setName(category.name);
    setTimeLabel(category.name);
    setDefaultSessionLength(category.time);
    setTimeLeftInSecond(Number.parseInt(category.time, 10) * 60);
    setSessionLength(Number.parseInt(category.time, 10));
  };

  const onReset = () => {
    setBreakLength(Number.parseInt(defaultBreakLength, 10));
    setSessionLength(Number.parseInt(defaultSessionLength, 10));
    setTimeLabel(name);
    setTimeLeftInSecond(Number.parseInt(defaultSessionLength, 10) * 60);
    setIsStart(false);
    setTimerInterval(null);
    setSession(true);
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
      if (session) {
        setTimeLabel('休憩');
        setSession(false);
        setTimeLeftInSecond(breakLength * 60);
      } else {
        setTimeLabel(name);
        setSession(true);
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

  if (!session) {
    //休憩中の表示
    return (
      <div className="bg_test">
        <Header title={timeLabel} />
        <div className={styles.container}>
          <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={timeLabel} />
          <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
          <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audioBeep}></audio>
          <div className={styles.label_break}>
            <p>{timeLabel}</p>
            <p>{defaultSessionLength}min</p>
          </div>
        </div>
        {/* <Bubble /> */}
        <VerificationModal open={open} handleModalClose={handleModalClose} onReset={onReset} name={timeLabel} />
      </div>
    );
  }

  return (
    <>
      <Header title={timeLabel} />
      <div className={styles.container}>
        <div className={styles.label}>
          <p>{timeLabel}</p>
          <p>{defaultSessionLength}min</p>
        </div>
        <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={timeLabel} />
        <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={audioBeep}></audio>
      </div>
      <VerificationModal open={open} handleModalClose={handleModalClose} onReset={onReset} name={timeLabel} />
    </>
  );
};

export default WorkPage;
