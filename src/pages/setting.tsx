import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from 'util/firebase';
import Header from 'components/Header';
import { Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { CategoryModal } from 'views/CategoryModal';

type PropsOptional = {
  onValueChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  name: string;
  time: number;
};

const CategoryList: React.FC<PropsOptional> = ({ onValueChange, name, time }) => {
  return (
    <ListItem button onClick={onValueChange}>
      <ListItemText primary={name} secondary={time ? `${time}分` : null} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const SettingPage: React.FC = (props) => {
  const router = useRouter();

  //state
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ name: '', time: 0, id: '', userId: '' });
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleListItemClick = (category: any) => {
    setSelectedOption(category);
    setOpen(true);
  };

  const handleAddCategoryClick = () => {
    setSelectedOption(null);
    setOpen(true);
  };

  const handleBack = async () => {
    router.back();
  };

  //Modal
  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalChange = async (name, time) => {
    if (userId) {
      if (selectedOption) {
        //カテゴリーの編集
        const categoryData = { name: name, time: time, userId: userId };
        await firebase.updateCategory(selectedOption.id, categoryData);
        await getCategories(userId);
      } else {
        //カテゴリーの追加
        const categoryData = { name: name, time: time, userId: userId };
        await firebase.createCategory(categoryData);
        await getCategories(userId);
      }
    }
    setOpen(false);
  };

  return (
    <>
      <Header title="設定" />
      <div className="content">
        <div style={{ marginBottom: 40 }}>
          <p className="title">カテゴリー</p>
          <List dense={true}>
            {categories.map((category) => (
              <CategoryList
                key={category.id}
                name={category.name}
                time={category.time}
                onValueChange={() => handleListItemClick(category)}
              />
            ))}
          </List>
          <Button variant="outlined" onClick={handleAddCategoryClick}>
            カテゴリーの追加
          </Button>
        </div>
        <Button variant="contained" color="primary" onClick={handleBack}>
          戻る
        </Button>
      </div>
      <CategoryModal open={open} handleModalClose={handleModalClose} handleModalChange={handleModalChange} category={selectedOption} />
    </>
  );
};

export default SettingPage;
