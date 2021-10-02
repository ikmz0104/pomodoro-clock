import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import { theme } from 'util/theme';

type RoundButtonProps = {
  isStart: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const RoundButton: FunctionComponent<RoundButtonProps> = (props) => {
  const size = 50;
  return (
    <Button
      style={{
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size,
        margin: 6,
        padding: 10,
        borderRadius: size / 2,
        background: !props.isStart ? theme.button.prime : theme.button.second,
        boxShadow: 'none',
        zIndex: 10,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};
