import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TransitionsDeleteModal from 'components/DeleteModal';

const useStyles = makeStyles({
  cancel: {
    background: '#E5E7EB',
    margin: 10,
  },
  finish: {
    margin: 10,
  },
});

export const CategoryDeleteModal = ({ open, handleModalClose, handleModalChange, category, handleListItemDelete}) => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [time, setTime] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const handleClose = () => {
    setNameError(false);
    setTimeError(false);
    setName(null);
    setTime(0);
    handleModalClose();
  };

  return (
    <TransitionsDeleteModal open={open} handleClose={handleClose}>
      <h4 className="modal_text">{'カテゴリーの削除'}</h4>
      <div>
        <h5>カテゴリ：XXXを削除しますがよろしいですか？
        </h5>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" className={classes.cancel} onClick={handleClose}>
          キャンセル
        </Button>
        <Button variant="contained" color="primary" className={classes.finish} onClick={handleListItemDelete}>
          削除
        </Button>
      </div>
    </TransitionsDeleteModal>
  );
};