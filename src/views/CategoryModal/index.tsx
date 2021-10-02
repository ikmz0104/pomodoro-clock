import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TransitionsModal from 'components/Modal';

const useStyles = makeStyles({
  cancel: {
    background: '#E5E7EB',
    margin: 10,
  },
  finish: {
    margin: 10,
  },
});

export const CategoryModal = ({ open, handleModalClose, handleModalChange, category }) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [time, setTime] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setTime(category.time);
    }
  }, [category]);

  const handleChange = () => {
    setNameError(false);
    setTimeError(false);

    if (!name) {
      setNameError(true);
    } else if (time <= 0 || !time) {
      setTimeError(true);
    } else {
      handleModalChange(name, time);
      setName(null);
      setTime(0);
    }
  };

  const handleClose = () => {
    setNameError(false);
    setTimeError(false);
    setName(null);
    setTime(0);
    handleModalClose();
  };

  return (
    <TransitionsModal open={open} handleClose={handleClose}>
      <h4 className="modal_text">{category ? 'カテゴリーの編集' : 'カテゴリーの追加'}</h4>
      <TextField
        id="name"
        label="カテゴリー名"
        error={nameError}
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        autoFocus
        variant="outlined"
        onChange={(event) => setName(event.target.value)}
        defaultValue={category ? category.name : null}
      />
      <TextField
        id="time"
        label="作業時間"
        error={timeError}
        type="number"
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="start">分</InputAdornment>,
        }}
        variant="outlined"
        onChange={(event) => setTime(Number(event.target.value))}
        defaultValue={category ? category.time : null}
      />
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" className={classes.cancel} onClick={handleClose}>
          キャンセル
        </Button>
        {category ? (
          <Button variant="contained" color="primary" className={classes.finish} onClick={handleChange}>
            変更
          </Button>
        ) : (
          <Button variant="contained" color="primary" className={classes.finish} onClick={handleChange}>
            追加
          </Button>
        )}
      </div>
    </TransitionsModal>
  );
};
