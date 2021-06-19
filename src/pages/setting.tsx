import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'util/firebase';
import Header from 'components/Header';
import { Button } from '@material-ui/core';
import { CategoryModal } from 'views/CategoryModal';

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
  const router = useRouter();

  //state
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ name: '', time: 0, id: '', userId: '' });
  const [time, setTime] = useState(25);
  //modal state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const userId = await firebase.getUserId(); //テストId
      setUserId(userId);
      await getCategories(userId);
    }
    fetchData();
  }, []);

  const getCategories = async (userId: any) => {
    try {
      const categories = await firebase.getCategories(userId);
      setCategories(categories);
      setSelectedOption(categories[0]);
      setTime(categories[0].time);
    } catch (e) {
      console.error(e);
    }
  };

  const onValueChange = (category) => {
    setSelectedOption(category);
    setTime(category.time);
  };

  const handleChange = (event) => {
    setTime(event.target.value);
    const newSelectedOption = selectedOption;
    newSelectedOption.time = Number(event.target.value);
    setSelectedOption(newSelectedOption);
  };

  const handleSettingChange = async () => {
    const data = { name: selectedOption.name, time: selectedOption.time, userId: selectedOption.userId };
    await firebase.setCategory(selectedOption.id, data);
    router.back();
  };

  //Modal
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalChange = async (name, time) => {
    if (userId) {
      const categoryData = { name: name, time: time, userId: userId };
      await firebase.createCategory(categoryData);
      await getCategories(userId);
    }
    setOpen(false);
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
              selectedOption={selectedOption.name}
            />
          ))}
          <Button onClick={() => setOpen(true)}>カテゴリーの追加</Button>
        </div>
        <div>
          <p className="title">作業時間</p>
          <input type="number" min="1" max="120" step="1" value={time} required onChange={handleChange} />
        </div>
        <Button variant="contained" color="primary" onClick={handleSettingChange}>
          完了
        </Button>
        <p>デザインまだ！</p>
      </div>
      <CategoryModal open={open} handleModalClose={handleModalClose} handleModalChange={handleModalChange} />
    </>
  );
};

export default SettingPage;
