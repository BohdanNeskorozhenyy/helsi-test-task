import React from 'react';
import { DatePicker } from 'mui-rff';
import { useStyles, Container } from './styles';

const DateInput = ({ name, variant, parentKeys, ...rest }) => {
  const classes = useStyles();
  console.log('reremder date');
  return (
    <Container>
      <DatePicker
        className={classes.root}
        required
        name={name}
        {...rest}
        TextFieldProps={{ variant }}
      />
    </Container>
  );
};

export default React.memo(
  DateInput,
  (prev, next) => prev.parentKeys === next.parentKeys || prev.disabled === next.disabled,
);
