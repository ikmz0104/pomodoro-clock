import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
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
import { GetServerSidePropsContext } from 'next';

//ssr
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    //cookieのuserid取得
    //ssrだとhooksが使えずuseContextで取得できなかったから
    const cookies = nookies.get(ctx);
    const { uid } = cookies;
    if (uid == null || uid == '') {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { userId: uid },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

type WorkPageProps = {
  userId: string;
};

const WorkPage: React.FC<WorkPageProps> = ({ userId }) => {
  const router: any = useRouter();
  const defaultBreakLength = '5';

  //state
  const [name, setName] = useState<string>('');
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

  //休憩時間になった瞬間に作業時間dbに記録するための。
  useEffect(() => {
    if (!session) {
      insertRecord();
    }
  }, [session]);

  const insertRecord = () => {
    if (!session) {
      firebase.setRecord(userId, router.query.id, sessionLength);
    } else {
      const recordTime = Math.floor(((sessionLength * 60 - timeLeftInSecond) / 60) * 10) / 10;
      firebase.setRecord(userId, router.query.id, recordTime);
    }
  };

  const getCategory = async (id: string) => {
    const category = await firebase.getCategory(id);
    setName(category.name);
    setDefaultSessionLength(category.time.toString());
    setTimeLeftInSecond(category.time * 60);
    setSessionLength(category.time);
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
    insertRecord(); //作業時間記録
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

  return (
    <div className="container">
      <div className={!session ? 'bg_test' : ''}>
        <Header title={name} />
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
              <p>{name}</p>
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
    </div>
  );
};

export default WorkPage;
