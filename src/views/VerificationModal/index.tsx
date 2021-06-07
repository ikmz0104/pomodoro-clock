import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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

export const VerificationModal = ({ open, handleModalClose, onReset, name }) => {
  const classes = useStyles();

  return (
    <TransitionsModal open={open} handleClose={handleModalClose}>
      <h4 className="modal_text">作業:{name}を終了しますか?</h4>
      <div>
        <Button variant="contained" className={classes.cancel} onClick={handleModalClose}>
          キャンセル
        </Button>
        <Button variant="contained" color="primary" className={classes.finish} onClick={onReset}>
          終了する
        </Button>
      </div>
    </TransitionsModal>
  );
};
