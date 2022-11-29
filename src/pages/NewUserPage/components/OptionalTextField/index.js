import React from 'react';
import Switch from '@mui/material/Switch';
import { useStyles, SwitchWrap, Container } from './styles';
import { TextField } from 'mui-rff';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

export const OptionalTextField = (name) => {
  const classes = useStyles();
  const { pageValue: requariedNewUserFields, setPageValue: setRequariedNewUserFields } =
    useLocalStorage({
      key: 'REQUARIED_NEW_USER_FORM_FIELDS',
      defaultValue: { ...requariedNewUserFields, [name.name]: false },
    });

  const onChange = () => {
    setRequariedNewUserFields({
      ...requariedNewUserFields,
      middleName: !requariedNewUserFields[name.name],
    });
  };

  return (
    <Container>
      <TextField
        className={classes.root}
        variant="standard"
        label="По батькові"
        name={name.name}
        required
        disabled={!requariedNewUserFields[name.name]}
      />
      <SwitchWrap>
        <Switch
          checked={requariedNewUserFields[name.name]}
          onChange={onChange}
          className={classes.root}
        />
      </SwitchWrap>
    </Container>
  );
};
