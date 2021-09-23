import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import nookies from 'nookies';
import { GetServerSidePropsContext } from 'next';
import firebase from 'util/firebase';
import CategoryList from 'components/CategoryList';
import Header from 'components/Header';
import Calendar from 'views/HeatCalendar';
import { auth } from '../../lib/db';
import { useRouter } from 'next/router';
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
import styles from '../styles/auth.module.css';
import SimpleBottomNavigation from 'views/Navigation';

//ApexCharts読み込むのにNext.jsで必要な設定
const DynamicGraphComponentWithNoSSR = dynamic(() => import('../views/ApexCharts/index'), { ssr: false });

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
      props: { currentUser: uid },
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

const Home = ({ currentUser }) => {
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [contributes, setContributes] = useState([]);

  const router = useRouter();

  const logOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userId = currentUser; //テストId
      await Promise.all([getUser(userId), getCategories(userId), getSeries(userId), getContributes(userId)]);
    }
    fetchData();
  }, []);

  const getUser = async (userId: string) => {
    try {
      const user = await firebase.getUserData(userId);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async (userId: string) => {
    try {
      const categories = await firebase.getCategories(userId);
      setCategories(categories);
    } catch (e) {
      console.error(e);
    }
  };

  const getSeries = async (userId: string) => {
    try {
      const series = await firebase.getSeries(userId);
      setSeries(series);
    } catch (e) {
      console.error(e);
    }
  };

  const getContributes = async (userId: string) => {
    try {
      const contributes = await firebase.getContributes(userId);
      setContributes(contributes)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Header title="みーたんタイマー" />
      <div className="content">
        <div>{currentUser ? <DesktopAccessDisabledIcon onClick={logOut} className={styles.logout_icon} /> : ''}</div>
        <hr></hr>
        <div style={{ marginBottom: 40 }}>
          <p className="title">カテゴリー</p>
          <CategoryList categories={categories} />
        </div>
        <div style={{ marginBottom: 40 }}>
          <p className="title">作業時間</p>
          <DynamicGraphComponentWithNoSSR series={series} />
        </div>
        <div style={{ marginBottom: 100 }}>
          <p className="title">カレンダー</p>
          <Calendar contributes = {contributes}/>
        </div>
      </div>
      <SimpleBottomNavigation />
    </div>
  );
};

export default Home;
