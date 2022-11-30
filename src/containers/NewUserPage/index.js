import React from 'react';
import { Form } from 'react-final-form';
import { Checkboxes, Radios, Select, DatePicker, TimePicker } from 'mui-rff';
import { Grid, Button, CssBaseline } from '@mui/material';
import { Paper, Container, ButtonBox } from './styles';
import { TextInput } from './components/TextInput';
import { DateInput } from './components/DateInput';
import { useUserValidation } from './validation';
import { onlyNumbers, onlyLetters } from './validation';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, ukUA } from '@mui/x-date-pickers';
import ukLocale from 'date-fns/locale/uk';

const onSubmit = async (values) => {
  alert(JSON.stringify(values, 0, 2));
};

export function NewUserPage() {
  const validate = useUserValidation();
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ukLocale}
      localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Container>
        <CssBaseline />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, pristine, values, form }) => {
            return (
              <form
                noValidate
                onSubmit={(event) => {
                  const isValid = form.getState().valid;
                  isValid
                    ? handleSubmit(event).then(() => {
                        form.restart();
                      })
                    : handleSubmit(event);
                }}
              >
                <Paper>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextInput
                        variant="standard"
                        label="Прізвище"
                        name="secondName"
                        parse={onlyLetters}
                        required
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextInput
                        variant="standard"
                        label="Ім'я"
                        name="firstName"
                        parse={onlyLetters}
                        required
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextInput
                        variant="standard"
                        label="По батькові"
                        optional
                        helperText="Немає по батькові згідно документів"
                        name="middleName"
                        required
                        parse={onlyLetters}
                        form={form}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextInput
                        variant="standard"
                        label="РНОКПП (ІПН)"
                        name="taxpayerCard"
                        helperText="Немає ІПН за віком чи має відмітку у паспорті"
                        required
                        maxLength={10}
                        parse={onlyNumbers}
                        optional
                        form={form}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <DateInput
                        name="dateOfBirth"
                        label="Дата народження"
                        variant="standard"
                        required
                      />
                    </Grid>
                  </Grid>
                  <ButtonBox>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => form.restart()}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                      Submit
                    </Button>
                  </ButtonBox>
                </Paper>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            );
          }}
        />
      </Container>
    </LocalizationProvider>
  );
}
