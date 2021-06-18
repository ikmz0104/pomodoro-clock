import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import firebase from 'util/firebase';
import CategoryList from 'components/CategoryList';
import Header from 'components/Header';
import HeatCalendar from 'react-heat-calendar';

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
          <HeatCalendar
            beginDate={new Date('2021-06-01')} // optional
            endDate={new Date('2022-01-01')} // optional
            dateField="date" // optional
            data={[
              { date: '2021-05-01', someAttr: 'baz' },
              { date: '2021-05-10', someAttr: 'foo' },
              { date: '2021-05-15', someAttr: 'baz' },
              { date: '2021-05-20', someAttr: 'baz' },
              { date: '2021-05-25', someAttr: 'foo' },
              { date: '2021-05-30', someAttr: 'bar' },
              { date: '2021-06-01', someAttr: 'baz' },
              { date: '2021-06-10', someAttr: 'foo' },
              { date: '2021-06-15', someAttr: 'bar' },
              { date: '2021-06-20', someAttr: 'baz' },
              // ...and so on
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
