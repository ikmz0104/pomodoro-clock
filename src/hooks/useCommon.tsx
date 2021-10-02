import React, { useState } from 'react';

export const useBool = (initialValue: boolean): [boolean, voidFunc, voidFunc] => {
  const [value, setValue] = useState(initialValue);
  return [value, () => setValue(true), () => setValue(false)];
};
