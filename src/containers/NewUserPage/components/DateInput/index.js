import React, { useState, useEffect } from 'react';
import { DatePicker } from 'mui-rff';
import { useStyles, Container } from './styles';

export const DateInput = ({ name, variant, ...rest }) => {
  const classes = useStyles();
  return (
    <Container>
      <DatePicker
        className={classes.root}
        required
        toolbarPlaceholder="1231231"
        name={name}
        {...rest}
        variant="inline"
        TextFieldProps={{ variant }}
      />
    </Container>
  );
};
