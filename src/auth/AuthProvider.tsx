import { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';
import nookies from 'nookies'; //ssrでcookieを使う
import { auth } from '../../lib/db';

export const AuthContext = createContext<{ user: firebase.User | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(null, 'uid', '', { path: '/' });
      } else {
        const uid = user.uid;
        setUser(user);
        //cookieにuserid保存
        nookies.set(null, 'uid', uid, { path: '/' });
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
