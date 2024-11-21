import React, { useState } from 'react';
import { InputNumber, InputNumberProps } from 'antd';

const CustomInputNumber: React.FC<InputNumberProps> = ({...restProps }) => {

  const [inputValue, setInputValue] = useState<number | null>(null);

  const handleInputChange = (value: number | null | string) => {
    const newValue = typeof value === 'string' ? null : value;
    setInputValue(newValue);
  };
  
  const handleInputPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.keyCode || event.which;

    const validInputRegex = /^[0-9\b]+$/;

    if (!validInputRegex.test(String.fromCharCode(keyCode)) && keyCode !== 8) {
      event.preventDefault();
    }
  };

  return (
    <InputNumber
      controls={true}
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleInputPress}
      {...restProps}
    />
  );
};


export default CustomInputNumber;
