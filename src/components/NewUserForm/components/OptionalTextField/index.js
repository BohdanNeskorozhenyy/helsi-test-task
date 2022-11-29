import React from 'react';
import { Field } from 'react-final-form';
import Switch from '@mui/material/Switch';
import { useStyles, SwitchWrap, Container } from './styles';
import { TextField } from 'mui-rff';

export const OptionalTextField = (name, ...rest) => {
  const classes = useStyles();
  return (
    <Container>
      <TextField
        className={classes.root}
        variant="standard"
        label="По батькові"
        name={name.name}
        required
      />
      <Field type="checkbox" name={name.name + '_isRequired'} {...rest}>
        {({ input }) => (
          <SwitchWrap>
            <Switch className={classes.root} {...input} />
          </SwitchWrap>
        )}
      </Field>
    </Container>
  );
};
