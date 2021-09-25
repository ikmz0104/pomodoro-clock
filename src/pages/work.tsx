import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import Times from 'components/Times';
import Controller from 'components/Controller';
import firebase from 'util/firebase';
import styles from 'styles/Work.module.css';
import { VerificationModal } from 'views/VerificationModal';
import SimpleBottomNavigation from 'views/Navigation';
import { usePhaseControl, useAudioRef } from 'hooks/useWork';
import { useBool } from 'hooks/useCommon';
import { db } from '../../lib/db';

const WorkPage: React.FC = (props) => {
  const router: any = useRouter();
  const defaultBreakLength = '5';

  //state
  const [name, setName] = useState<string>('みーたん！');
  const [defaultSessionLength, setDefaultSessionLength] = useState<string>('25');
  const [isStart, setIsStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [breakLength, setBreakLength] = useState<number>(Number.parseInt(defaultBreakLength, 10));
  const [sessionLength, setSessionLength] = useState<number>(Number.parseInt(defaultSessionLength, 10));
  const [timerInterval, setTimerInterval] = useState(null);

  const [chime, setChime] = useState<string>(''); //チャイム
  const [breakSound, setBreakSound] = useState<string>(''); //みーたんボイスの

  //カスタムフック作ったよ👀
  const [open, handleModalOpen, handleModalClose] = useBool(false); //モーダル
  const [minaAudioBeep, setMinaAudioDefault, minaAudioPlay] = useAudioRef(); //みーたボイスRef
  const [chimeAudioBeep, setChimeAudioDefault, chimeAudioPlay] = useAudioRef(); //チャイム音Ref
  const [timeLabel, session, setSession, timeLeftInSecond, setTimeLeftInSecond, decreaseTimer] = usePhaseControl(
    defaultSessionLength,
    breakLength,
    sessionLength,
    name,
    chimeAudioPlay,
  );

  //最初のレンダリング時
  useEffect(() => {
    async function fetchData(id: string) {
      await Promise.all([getCategory(id), getSounds()]);
    }
    if (!router.isReady) {
      return;
    }
    if (router.query.id) {
      fetchData(router.query.id);
    }
  }, [router.isReady]);

  const getCategory = async (id: string) => {
    const category = await firebase.getCategory(id);
    setName(category.name);
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
    setMinaAudioDefault();
    setChimeAudioDefault();
  };

  //タイマーのリセット(終了するボタンを押した時)
  const onReset = () => {
    setBreakLength(Number.parseInt(defaultBreakLength, 10));
    setSessionLength(Number.parseInt(defaultSessionLength, 10));
    setTimeLeftInSecond(Number.parseInt(defaultSessionLength, 10) * 60);
    setIsStart(false);
    setTimerInterval(null);
    setSession(true);
    handleModalClose();
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

  //みーたんボイスを再生する!
  const playMitanVoice = () => {
    setChimeAudioDefault();
    minaAudioPlay();
  };

  //時間を累積する！
  const CompleteTasks = (e) => {
    db.collection('users').doc().collection('record').doc().add({ time: defaultSessionLength });
    //dummy code : if (doc.exists) ? <time> + defaultSessionLengthset : set defaultSessionLength
  };

  return (
    <div className="container">
      <div className={!session ? 'bg_test' : ''}>
        <Header title={timeLabel} />
        {!session ? (
          <div className={styles.container}>
            <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={session ? name : '休憩'} />
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
            <Times session={session} timeLeftInSecond={timeLeftInSecond} timeLabel={session ? name : '休憩'} />
            <Controller onReset={onReset} onStartStop={onStartStop} isStart={isStart} pause={pause} handleModalOpen={handleModalOpen} />
          </div>
        )}
      </div>
      <VerificationModal open={open} handleModalClose={handleModalClose} onReset={onReset} name={session ? name : '休憩'} />
      <audio id="beep" preload="auto" src={chime} ref={chimeAudioBeep} onEnded={playMitanVoice}></audio>
      <audio id="beep" preload="auto" src={breakSound} ref={minaAudioBeep}></audio>
      <SimpleBottomNavigation />
    </div>
  );
};

export default WorkPage;
