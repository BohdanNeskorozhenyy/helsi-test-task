import React, { useState, useEffect } from 'react';
import { Select } from 'mui-rff';
import { MenuItem } from '@mui/material';
import { Container } from './styles';
import { useLocalStorage } from '../../../../lib/hooks/useLocalStorage';

const SelectInput = ({ items, name, values, parentKey, ...rest }) => {
  const [value, setValue] = useState('placeholder');
  const { setPageValue: setParentKeys } = useLocalStorage({
    key: 'PARENT_KEYS',
    defaultValue: {},
  });

  useEffect(() => {
    if (values && !values[name]) {
      setValue('placeholder');
    }
  }, [values]);

  const clickHandler = (item) => {
    if (parentKey) {
      setParentKeys({ [name]: item.name });
    }
    setValue(item.name);
  };

  return (
    <Container>
      <Select value={value} sx={{ padding: '5.5px 0' }} name={name} {...rest}>
        <MenuItem disabled value="placeholder">
          --Вибрати--
        </MenuItem>
        {items.map((item) => (
          <MenuItem
            sx={{ overflowX: 'auto' }}
            onClick={() => clickHandler(item)}
            key={item.name}
            value={item.name}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export default SelectInput;
