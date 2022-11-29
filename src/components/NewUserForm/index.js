import React from 'react';
import { Form } from 'react-final-form';
import { Checkboxes, Radios, Select, DatePicker, TimePicker, TextField } from 'mui-rff';
import { MenuItem, Grid, Button, CssBaseline } from '@mui/material';
import { Paper, Container, useStyles } from './styles';
import { OptionalTextField } from './components/OptionalTextField';
import DateFnsUtils from '@date-io/date-fns';
import { validate } from './validation';

const onSubmit = async (values) => {
  alert(JSON.stringify(prepareData(values), 0, 2));
};

const prepareData = (data) => {
  const filtered = Object.entries(data).filter((item) => !item[0].includes('_isRequired'));
  return Object.fromEntries(filtered);
};

const formFields = [
  {
    size: 6,
    field: <TextField label="Last Name" name="lastName" margin="none" required={true} />,
  },
  {
    size: 12,
    field: <TextField type="email" label="Email" name="email" margin="none" required={true} />,
  },
  {
    size: 12,
    field: (
      <Checkboxes
        name="employed"
        formControlProps={{ margin: 'none' }}
        data={{ label: 'Employed', value: true }}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Radios
        label="Best Stooge"
        name="stooge"
        formControlProps={{ margin: 'none' }}
        radioGroupProps={{ row: true }}
        data={[
          { label: 'Larry', value: 'larry' },
          { label: 'Moe', value: 'moe' },
          { label: 'Curly', value: 'curly' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Checkboxes
        label="Sauces"
        name="sauces"
        formControlProps={{ margin: 'none' }}
        formGroupProps={{ row: true }}
        data={[
          { label: 'Ketchup', value: 'ketchup' },
          { label: 'Mustard', value: 'mustard' },
          { label: 'Salsa', value: 'salsa' },
          { label: 'Guacamole 🥑', value: 'guacamole' },
        ]}
      />
    ),
  },
  {
    size: 12,
    field: <TextField name="notes" multiline label="Notes" margin="none" />,
  },
  {
    size: 12,
    field: (
      <Select name="city" label="Select a City" formControlProps={{ margin: 'none' }}>
        <MenuItem value="London">London</MenuItem>
        <MenuItem value="Paris">Paris</MenuItem>
        <MenuItem value="Budapest">A city with a very long Name</MenuItem>
      </Select>
    ),
  },
  {
    size: 6,
    field: (
      <DatePicker
        name="rendez-vous"
        margin="normal"
        label="Rendez-vous"
        dateFunsUtils={DateFnsUtils}
      />
    ),
  },
  {
    size: 6,
    field: <TimePicker name="alarm" margin="normal" label="Alarm" dateFunsUtils={DateFnsUtils} />,
  },
];

export function NewUserForm() {
  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
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
                    required
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    className={classes.root}
                    variant="standard"
                    label="Ім'я"
                    name="firstName"
                    required
                  />
                </Grid>

                <Grid item xs={4}>
                  <OptionalTextField name="middleName" />
                </Grid>
              </Grid>
              <Grid item xs={4} style={{ marginTop: 16 }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => form.restart()}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                  Submit
                </Button>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(prepareData(values), 0, 2)}</pre>
          </form>
        )}
      />
    </Container>
  );
}
