import * as React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'util/firebase';
import Header from 'components/Header';
import { Button } from '@material-ui/core';

type PropsOptional = {
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  selectedOption: string;
};

const CategoryRadio: React.FC<PropsOptional> = ({ onValueChange, name, selectedOption }) => {
  return (
    <div className="radio">
      <label>
        <input type="radio" value={name} checked={selectedOption === name} onChange={onValueChange} />
        {name}
      </label>
    </div>
  );
};

const SettingPage: React.FC = (props) => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState('React');
  const [time, setTime] = useState(25);

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
      setSelectedOption(categories[0].name);
      setTime(categories[0].time);
    } catch (e) {
      console.error(e);
    }
  };

  const onValueChange = (category) => {
    setSelectedOption(category.name);
    setTime(category.time);
  };

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      <Header title="設定" />
      <div className="content">
        <div style={{ marginBottom: 40 }}>
          <p className="title">カテゴリー</p>
          {categories.map((category) => (
            <CategoryRadio
              key={category.id}
              name={category.name}
              onValueChange={() => onValueChange(category)}
              selectedOption={selectedOption}
            />
          ))}
        </div>
        <div>
          <p className="title">作業時間</p>
          <input type="number" min="1" max="120" step="1" value={time} required onChange={handleChange} />
        </div>
        <Button variant="contained" color="primary">
          完了
        </Button>
        <p>デザインまだ！</p>
      </div>
    </>
  );
};

export default SettingPage;
