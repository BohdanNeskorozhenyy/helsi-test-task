import React, { useState, useEffect, useRef } from 'react';
import Switch from '@mui/material/Switch';
import { useStyles, Container, Absolute, Wraper } from './styles';
import { TextField } from 'mui-rff';
import { Field } from 'react-final-form';
import { useLocalStorage } from '../../../../lib/hooks/useLocalStorage';
import { MdInfoOutline } from 'react-icons/md';

const TextInput = ({ maxLength, form, name, optional, parentKeys, helperText, parse, ...rest }) => {

  const classes = useStyles();
  const inputRef = useRef();

  const { pageValue: newUserFormRequireds, setPageValue: setNewUserFormRequireds } =
    useLocalStorage({
      key: 'NEW_USER_FORM_REQUIREDS',
      defaultValue: { name: true },
    });

  const [required, setRequired] = useState(
    typeof newUserFormRequireds[name] === 'undefined' ? false : newUserFormRequireds[name],
  );

  useEffect(() => {
    setNewUserFormRequireds({
      ...newUserFormRequireds,
      [name]: required,
    });
    inputRef.current.value && form.change(name, '');
  }, [required]);

  const onChange = () => {
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
                inputRef={inputRef}
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

export default React.memo(TextInput, (prev, next) => prev.parentKeys === next.parentKeys);
