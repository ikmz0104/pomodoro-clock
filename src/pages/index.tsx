import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import firebase from 'util/firebase';
import CategoryList from 'components/CategoryList';
import Header from 'components/Header';
import Calendar from 'components/Calendar';

//ApexCharts読み込むのにNext.jsで必要な設定
const DynamicGraphComponentWithNoSSR = dynamic(() => import('../views/Graph/Graph'), { ssr: false });

const Home: React.FC = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userId = '12345678'; //テストId
      await Promise.all([getUser(userId), getCategories(userId)]);
    }
    fetchData();
  }, []);

  const getUser = async (userId: any) => {
    try {
      const user = await firebase.getUserData(userId);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async (userId: any) => {
    try {
      const categories = await firebase.getCategories(userId);
      setCategories(categories);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header title="みーたんタイマー" />
      <div className="content">
        <div style={{ marginBottom: 40 }}>
          <p className="title">カテゴリー</p>
          <CategoryList categories={categories} />
        </div>
        <div style={{ marginBottom: 40 }}>
          <p className="title">作業時間</p>
          <React.StrictMode>
            <DynamicGraphComponentWithNoSSR />
          </React.StrictMode>
        </div>
        <div style={{ marginBottom: 40 }}>
          <p className="title">カレンダー</p>
          <Calendar />
        </div>
      </div>
    </>
  );
};

export default Home;