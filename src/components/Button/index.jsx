import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(45deg, #3CC2BD 30%, #ABDEDE 80%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 50px',
    // boxShadow: '0 1px 5px 2px #A4D2FF',
  },
};

function CustomButton(props) {
  const { classes, children, className, onClick, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} onClick={onClick} {...other}>
      {children || 'class names'}
    </Button>
  );
}

export default withStyles(styles)(CustomButton);
