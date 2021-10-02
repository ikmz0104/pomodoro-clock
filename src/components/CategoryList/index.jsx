import React from 'react';
import { useRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Divider from '@material-ui/core/Divider';

const CategoryList = ({ categories }) => (
  <List>
    {categories.map((category, i) => {
      const router = useRouter();

      const handleChange = () => {
        router.push({
          pathname: '/work',
          query: { id: category.id },
        });
      };

      return (
        <div key={i}>
          <ListItem key={i} button onClick={handleChange}>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" style={{ background: '#44AEEF', padding: 5 }} onClick={handleChange}>
                <PlayArrowRoundedIcon style={{ color: 'white' }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      );
    })}
  </List>
);

export default React.memo(CategoryList);
