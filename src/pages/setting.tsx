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
import { CategoryDeleteModal } from 'views/CategoryDeleteModal';
import { useAuth } from 'hooks/useAuth';

type PropsOptional = {
  onValueChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleListItemDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  category: CategoryProps;
};

const CategoryList = React.memo<PropsOptional>(({ onValueChange, category, handleListItemDelete }) => {
  return (
    <ListItem button onClick={onValueChange}>
      <ListItemText primary={category.name} secondary={category.time ? `${category.time}分` : null} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleListItemDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

const SettingPage: React.FC = () => {
  const router = useRouter();

  //state
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ name: '', time: 0, id: '', userId: '' });
  //modal state
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const userId = user.uid;
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

  const handleDeleteCategoryClick = () => {
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

  //カテゴリー削除
  const handleListItemDelete = async (id: string) => {
    try {
      await firebase.deleteCategory(id);
      await getCategories(userId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header title="設定" />
      <div className="content">
        <div className="mb">
          <p className="title">カテゴリー</p>
          <List dense={true}>
            {categories.map((category) => (
              <CategoryList
                key={category.id}
                category={category}
                onValueChange={() => handleListItemClick(category)}
                handleListItemDelete={() => handleListItemDelete(category.id)}
              />
            ))}
          </List>
        </div>
        <div className="center mb">
          <div className="inline mr">
            <Button variant="contained" onClick={handleBack}>
              戻る
            </Button>
          </div>
          <div className="inline">
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={handleAddCategoryClick}>
              カテゴリーの追加
            </Button>
          </div>
        </div>
      </div>
      <CategoryModal open={open} handleModalClose={handleModalClose} handleModalChange={handleModalChange} category={selectedOption} />
    </>
  );
};

export default SettingPage;
