import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from '../util/firebase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '../components/Button';

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
      console.log(user);
    } catch (e) {
      console.error(e);
    }
  };

  const getCategories = async (userId: any) => {
    try {
      const categories = await firebase.getCategories(userId);
      setCategories(categories);
      console.log(categories);
    } catch (e) {
      console.error(e);
    }
  };

  const CategoryList = () => (
    <List>
      {categories.map((category, i) => {
        const router = useRouter();

        const handleChange = () => {
          router.push({
            pathname: '/work',
            query: { name: category.name, time: category.time },
          });
        };

        return (
          <ListItem key={i}>
            <ListItemText primary={category.name} secondary={`${category.time} min`} />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <Button onClick={handleChange}>開始</Button>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      <p>ホーム画面</p>
      <div>
        <p>カテゴリー</p>
        <ul>
          <CategoryList />
        </ul>
      </div>
    </>
  );
};

export default Home;
