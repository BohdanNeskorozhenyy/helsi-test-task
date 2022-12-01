import React, { useEffect } from 'react';

import { Form } from 'react-final-form';
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Paper, Container, ButtonBox, Inner, Header, BackButton } from './styles';
import { MdKeyboardBackspace } from 'react-icons/md';
import TextInput from './components/text-input';
import DateInput from './components/date-input';
import SelectInput from './components/select-input';
import { useUserValidation } from './validation';
import PhoneInput from './components/phone-input';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, ukUA } from '@mui/x-date-pickers';
import ukLocale from 'date-fns/locale/uk';

import { sexOfUser, connectWay, documentTypes } from './constants';
import { onlyNumbers, onlyLettersFirsUppercase, onlyLetters } from './validation';

import { useLocalStorage } from '../../lib/hooks/useLocalStorage';

const onSubmit = async (values) => {
  alert(JSON.stringify(values, 0, 2));
};

export function NewUserPage() {
  const validate = useUserValidation();

  const { pageValue: parentKeys, setPageValue: setParentKeys } = useLocalStorage({
    key: 'PARENT_KEYS',
    defaultValue: {},
  });

  const { setPageValue: setNewUserFormRequireds } = useLocalStorage({
    key: 'NEW_USER_FORM_REQUIREDS',
    defaultValue: {},
  });

  useEffect(() => {
    setParentKeys({});
    setNewUserFormRequireds({});
  }, []);

  const TODAY = new Date().getTime();
  const TEN_YEARS = 315569259747;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ukLocale}
      localeText={ukUA.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Container>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, pristine, values, form, valid }) => {
            return (
              <form
                noValidate
                onSubmit={(event) => {
                  valid
                    ? handleSubmit(event).then(() => {
                        form.restart();
                      })
                    : handleSubmit(event);
                }}
              >
                <Header>
                  <BackButton type="button">
                    <MdKeyboardBackspace />
                  </BackButton>
                  <Typography variant="h5">Створення персони</Typography>
                </Header>
                <Paper sx={{ gap: '0px' }}>
                  <Typography pb="10px" variant="h5">
                    Дані пацієнта
                  </Typography>
                  <Inner>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextInput
                          variant="standard"
                          label="Прізвище"
                          name="secondName"
                          parse={onlyLettersFirsUppercase}
                          required
                        />
                      </Grid>

                      <Grid item xs={4}>
                        <TextInput
                          variant="standard"
                          label="Ім'я"
                          name="firstName"
                          parse={onlyLettersFirsUppercase}
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
                          parse={onlyLettersFirsUppercase}
                          resetInput={form.change}
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
                          resetInput={form.change}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <DateInput
                          name="dateOfBirth"
                          label="Дата народження"
                          shouldDisableDate={(day) => day.getTime() > TODAY}
                          variant="standard"
                          required
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SelectInput
                          items={sexOfUser}
                          name="sexOfUser"
                          variant="standard"
                          label="Cтать"
                          values={values}
                          required
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextInput
                          variant="standard"
                          label="Країна народження"
                          name="countriOfBirth"
                          required
                          maxLength={10}
                          form={form}
                          parse={onlyLettersFirsUppercase}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          variant="standard"
                          label="Місце народження"
                          name="placeOfBirth"
                          required
                          maxLength={10}
                          form={form}
                          parse={onlyLettersFirsUppercase}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <SelectInput
                          items={connectWay}
                          name="connectWay"
                          variant="standard"
                          label="Бажаний спосіб зв'язку із пацієнтом"
                          form={form}
                          parentKey
                          values={values}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          variant="standard"
                          label="Секретне слово (не менше 6 символів)"
                          name="secretWord"
                          required
                          parse={onlyLetters}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <PhoneInput name="phoneNumber" label="Контактний номер телефону" />
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          variant="standard"
                          label="Адреса електронної пошти"
                          name="email"
                          type="email"
                          placeholder="examle@examle.com"
                        />
                      </Grid>
                    </Grid>
                  </Inner>
                  <Typography mt="30px" pb="10px" variant="h5">
                    Документ, що посвідчує особу
                  </Typography>
                  <Inner>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <SelectInput
                          items={documentTypes}
                          name="documentType"
                          variant="standard"
                          label="Тип документу"
                          required
                          parentKey
                          values={values}
                          form={form}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          disabled={!values.documentType}
                          variant="standard"
                          label="Серія (за наявності), номер"
                          name="seriesOfDocument"
                          required
                          parentKeys={parentKeys}
                          parse={
                            parentKeys.documentType === documentTypes[1].name
                              ? onlyNumbers
                              : (e) => e
                          }
                          maxLength={(() => {
                            switch (values.documentType) {
                              case documentTypes[2].name:
                                return 9;
                              case documentTypes[3].name:
                                return 8;
                              default:
                                return 16;
                            }
                          })()}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <DateInput
                          disabled={!values.documentType}
                          variant="standard"
                          parentKeys={parentKeys}
                          label="Коли видано"
                          name="whenCreated"
                          required
                          shouldDisableDate={(day) => day.getTime() > TODAY}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DateInput
                          disabled={!values.whenCreated || !values.documentType}
                          name="validUntil"
                          parentKeys={parentKeys}
                          label="Діє до"
                          variant="standard"
                          shouldDisableDate={(day) =>
                            values.whenCreated > day ||
                            new Date(values.whenCreated).getTime() + TEN_YEARS < day
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextInput
                          disabled={!values.documentType}
                          parentKeys={parentKeys}
                          variant="standard"
                          type="textarea"
                          label="Ким видано"
                          name="whoIssued"
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          disabled={!values.documentType}
                          parentKeys={parentKeys}
                          name="UNZRquery"
                          label="Запит № (УНЗР)"
                          variant="standard"
                          required
                          helperText="Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"
                          parse={onlyNumbers}
                          placeholder="РРРРММДД-ХХХХХ"
                          maxLength={13}
                        />
                      </Grid>
                    </Grid>
                  </Inner>
                  <ButtonBox>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => {
                        form.restart();
                        setParentKeys({});
                      }}
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
