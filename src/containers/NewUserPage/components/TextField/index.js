import React from 'react';
import Switch from '@mui/material/Switch';
import { useStyles, SwitchWrap, Container } from './styles';
import { TextField as MTextField } from 'mui-rff';
import { useLocalStorage } from '../../../../lib/hooks/useLocalStorage';

export const TextField = ({ name, optional, ...rest }) => {
  const classes = useStyles();
  const { pageValue: newUserFormRequireds, setPageValue: setNewUserFormRequireds } =
    useLocalStorage({
      key: 'NEW_USER_FORM_REQUIREDS',
      defaultValue: { ...newUserFormRequireds, [name]: false },
    });

  const onChange = () => {
    setNewUserFormRequireds({
      ...newUserFormRequireds,
      [name]: !newUserFormRequireds[name],
    });
  };

  return (
    <Container>
      <MTextField name={name} disabled={optional && !newUserFormRequireds[name]} {...rest} />
      {optional && (
        <SwitchWrap>
          <Switch
            checked={newUserFormRequireds[name]}
            onChange={onChange}
            className={classes.root}
          />
        </SwitchWrap>
      )}
    </Container>
  );
};
