import * as React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'util/firebase';
import CategoryList from 'components/CategoryList';
import Header from 'components/Header';

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
        <div>
          <p className="title">作業時間</p>
        </div>
      </div>
    </>
  );
};

export default Home;
