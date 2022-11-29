import React from 'react';
import { Form, Field } from 'react-final-form';
import { Checkboxes, Radios, Select, DatePicker, TimePicker } from 'mui-rff';
import { MenuItem, Grid, Button, CssBaseline } from '@mui/material';
import { Paper, Container, useStyles, ButtonBox } from './styles';
import { TextField } from './components/TextField';
import { useUserValidation } from './validation';
import { onlyNumbers, onlyLetters } from './validation';

const onSubmit = async (values) => {
  alert(JSON.stringify(values, 0, 2));
};

export function NewUserPage() {
  const classes = useStyles();
  const validate = useUserValidation();
  return (
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
                    <TextField
                      className={classes.root}
                      variant="standard"
                      label="Прізвище"
                      name="secondName"
                      parse={onlyLetters}
                      required
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      className={classes.root}
                      variant="standard"
                      label="Ім'я"
                      name="firstName"
                      parse={onlyLetters}
                      required
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      className={classes.root}
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
                    <TextField
                      className={classes.root}
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

                  {/* <Grid item xs={4}>
                    <TextField
                      className={classes.root}
                      variant="standard"
                      label="Ім'я"
                      name="firstName"
                      required
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      className={classes.root}
                      variant="standard"
                      label="По батькові"
                      optional
                      form={form}
                      helperText="Немає по батькові згідно документів"
                      name="middleName"
                      required
                    />
                  </Grid> */}
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
  );
}
