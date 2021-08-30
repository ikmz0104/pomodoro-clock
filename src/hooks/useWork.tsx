import React, { useState, useEffect } from 'react';

export const usePhaseControl = (
  defaultSessionLength: string,
  breakLength: number,
  sessionLength: number,
  name: string,
  play: voidFunc,
): Readonly<[string, boolean, React.Dispatch<React.SetStateAction<boolean>>, number, React.Dispatch<React.SetStateAction<number>>, voidFunc]> => {
  const [session, setSession] = useState<boolean>(true); //sessionがTrueなら作業中 Falseなら休憩中
  const [timeLeftInSecond, setTimeLeftInSecond] = useState<number>(Number.parseInt(defaultSessionLength, 10) * 60);
  const [timeLabel, setTimeLabel] = useState<string>(name);
  //残り時間を-1秒更新する
  const decreaseTimer = () => {
    setTimeLeftInSecond((preTimeLeftInSecond) => preTimeLeftInSecond - 1);
  };

  useEffect(() => {
    if (timeLeftInSecond === 0) {
      play();
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
  }, [timeLeftInSecond]);
  return [timeLabel, session, setSession, timeLeftInSecond, setTimeLeftInSecond, decreaseTimer] as const;
};


export const useAudioRef = (): Readonly<[any, voidFunc, voidFunc]> => {
  const audioBeep: any = React.createRef();
  const setDefault = () => {
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  };
  const play = () => {
    audioBeep.current.play();
  };

  return [audioBeep, setDefault, play] as const;
};