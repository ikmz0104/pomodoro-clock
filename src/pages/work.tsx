import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Times from 'components/Times';
import Controller from 'components/Controller';
import firebase from 'util/firebase';
import styles from 'styles/Work.module.css';
import { VerificationModal } from 'views/VerificationModal';
import SimpleBottomNavigation from 'views/Navigation';

const WorkPage: React.FC = (props) => {
  const router: any = useRouter();
  const defaultBreakLength = '5';

  const audioBeep: any = React.createRef();
  const chimeAudioBeep: any = React.createRef();

  //state
  const [name, setName] = useState('みーたん！');
  const [defaultSessionLength, setDefaultSessionLength] = useState('25');
  const [isStart, setIsStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [timeLabel, setTimeLabel] = useState(name);
  const [session, setSession] = useState(true); //sessionがTrueなら作業中 Falseなら休憩中
  const [timeLeftInSecond, setTimeLeftInSecond] = useState(Number.parseInt(defaultSessionLength, 10) * 60);
  const [breakLength, setBreakLength] = useState(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);

  const [chime, setChime] = useState(''); //チャイム
  const [breakSound, setBreakSound] = useState(''); //みーたんボイスの
  //modal
  const [open, setOpen] = useState(false);

  //最初のレンダリング時
  useEffect(() => {
    async function fetchData(id) {
      await Promise.all([getCategory(id), getSounds()]);
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

  const getSounds = async () => {
    const sounds = await firebase.getSounds();
    setChime(sounds.chime);
    setBreakSound(sounds.breakData[Math.floor(Math.random() * sounds.breakData.length)]); //ランダムに一つサウンド選ぶ
  };

  //サウンドの初期化(ストップして再生位置を最初の位置に戻す)
  const setSound = async () => {
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
    chimeAudioBeep.current.pause();
    chimeAudioBeep.current.currentTime = 0;
  };

  //タイマーのリセット(終了するボタンを押した時)
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

    setSound();
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
      setSound();
      timerInterval && clearInterval(timerInterval);

      setPause(true);
      setIsStart(!isStart);
      setTimerInterval(null);
    }
  };

  //残り時間を-1秒更新する
  const decreaseTimer = () => setTimeLeftInSecond((preTimeLeftInSecond) => preTimeLeftInSecond - 1);

  //みーたんボイスを再生する!
  const playMitanVoice = () => {
    chimeAudioBeep.current.pause();
    chimeAudioBeep.current.currentTime = 0;
    audioBeep.current.play();
  };

  //作業と休憩の切替
  const phaseControl = () => {
    if (timeLeftInSecond === 0) {
      chimeAudioBeep.current.play();
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

  return (
    <>
      <div className={!session ? 'bg_test' : ''}>
        <Header title={timeLabel} />
        {!session ? (
          <div className={styles.container}>
            <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={timeLabel} />
            <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
            <div className={styles.label_break}>
              <p>{timeLabel}</p>
              <p>{defaultSessionLength}min</p>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.label}>
              <p>{timeLabel}</p>
              <p>{defaultSessionLength}min</p>
            </div>
            <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={timeLabel} />
            <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
          </div>
        )}
      </div>
      <VerificationModal open={open} handleModalClose={handleModalClose} onReset={onReset} name={timeLabel} />
      <audio id="beep" preload="auto" src={chime} ref={chimeAudioBeep} onEnded={playMitanVoice}></audio>
      <audio id="beep" preload="auto" src={breakSound} ref={audioBeep}></audio>
      <SimpleBottomNavigation />
    </>
  );
};

export default WorkPage;
