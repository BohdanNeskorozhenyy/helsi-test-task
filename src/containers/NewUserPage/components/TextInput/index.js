import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { useStyles, Container, Absolute, Wraper } from './styles';
import { TextField } from 'mui-rff';
import { makeStyles } from '@material-ui/styles';
import { Field } from 'react-final-form';
import { useLocalStorage } from '../../../../lib/hooks/useLocalStorage';
import { MdInfoOutline } from 'react-icons/md';

export const TextInput = ({ maxLength, form, name, optional, helperText, parse, ...rest }) => {
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
            <Wraper optional={optional}>
              <TextField
                className={classes.root}
                disabled={isDispabled}
                helperText={isDispabled && helperText}
                inputProps={{ maxLength }}
                {...rest}
                {...input}
              />
              <Absolute>
                {!optional && meta.touched && !meta.valid && <MdInfoOutline />}
                {optional && (
                  <Switch checked={required} onChange={onChange} className={classes.root} />
                )}
              </Absolute>
            </Wraper>
          );
        }}
      </Field>
    </Container>
  );
};
