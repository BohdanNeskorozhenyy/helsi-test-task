import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useStyles, Container, Absolute } from './styles';
import { TextField as MTextField } from 'mui-rff';

import { Field } from 'react-final-form';
import { useLocalStorage } from '../../../../lib/hooks/useLocalStorage';
import { MdInfoOutline } from 'react-icons/md';

export const TextField = ({ maxLength, form, name, optional, helperText, parse, ...rest }) => {
  const classes = useStyles();
  const { pageValue: newUserFormRequireds, setPageValue: setNewUserFormRequireds } =
    useLocalStorage({
      key: 'NEW_USER_FORM_REQUIREDS',
      defaultValue: {},
    });
  const [required, setRequired] = useState(newUserFormRequireds[name]);

  useEffect(() => {
    setNewUserFormRequireds({
      ...newUserFormRequireds,
      [name]: required,
    });
  }, [required]);

  const onChange = () => {
    form.change(name, '');
    setRequired((required) => !required);
  };

  const isDispabled = optional && !newUserFormRequireds[name];
  return (
    <Container>
      <Field parse={parse} name={name}>
        {({ input, meta }) => {
          return (
            <>
              <MTextField
                disabled={isDispabled}
                helperText={isDispabled && helperText}
                inputProps={{ maxLength }}
                {...rest}
                {...input}
              />
              <Absolute>
                {meta.touched && !meta.valid && <MdInfoOutline />}
                {optional && (
                  <Switch checked={required} onChange={onChange} className={classes.root} />
                )}
              </Absolute>
            </>
          );
        }}
      </Field>
    </Container>
  );
};
