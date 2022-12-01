import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import { Container, Absolute } from './styles';
import { MdInfoOutline } from 'react-icons/md';
import { Field } from 'react-final-form';

const PhoneInput = ({ form, name, ...props }) => {
  return (
    <Container>
      <Field name={name}>
        {({ input, meta }) => {
          return (
            <>
              <MuiPhoneNumber
                sx={{ width: '100%' }}
                placeholder="+38 (__)__-__-__"
                disableDropdown
                helperText={meta.touched && !meta.valid && meta.error}
                error={meta.touched && !meta.valid}
                defaultCountry={'ua'}
                {...props}
                {...input}
              />
              <Absolute>{meta.touched && !meta.valid && <MdInfoOutline />}</Absolute>
            </>
          );
        }}
      </Field>
    </Container>
  );
};

export default React.memo(PhoneInput, () => true);
