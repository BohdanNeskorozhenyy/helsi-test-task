import * as yup from 'yup';
import { setIn } from 'final-form';
import { useLocalStorage } from '../../lib/hooks/useLocalStorage';
import {
  FIELD_IS_REQUIRED,
  TO_SHORT,
  RNOKPP_ERROR,
  NUMBER_ERROR,
  BOOK_PASSWORD_ERROR,
  EMAIL_ERROR,
} from '../../constants/validationConstants';
import { documentTypes } from './constants';

export const useUserValidation = () => {
  const { pageValue: newUserFormRequireds } = useLocalStorage({
    key: 'NEW_USER_FORM_REQUIREDS',
    defaultValue: {},
  });
  const { pageValue: parentKeys } = useLocalStorage({
    key: 'PARENT_KEYS',
    defaultValue: {},
  });

  const validateFormValues = (schema) => async (values) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err) {
      const errors = err.inner.reduce((formError, innerError) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});

      return errors;
    }
  };

  const validationSchema = yup.object({
    secondName: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT(2)),
    firstName: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT(2)),
    middleName: yup.string().when([], {
      is: () => newUserFormRequireds.middleName,
      then: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT(2)),
      otherwise: yup.string().notRequired(),
    }),
    taxpayerCard: yup.string().when([], {
      is: () => newUserFormRequireds.taxpayerCard,
      then: yup.string().required(FIELD_IS_REQUIRED).min(10, RNOKPP_ERROR),
      otherwise: yup.string().notRequired(),
    }),
    dateOfBirth: yup.date().required(FIELD_IS_REQUIRED),
    sexOfUser: yup.string().required(FIELD_IS_REQUIRED),
    countriOfBirth: yup.string().required(FIELD_IS_REQUIRED).min(4, TO_SHORT(4)),
    placeOfBirth: yup.string().nullable().required(FIELD_IS_REQUIRED).min(4, TO_SHORT(4)),
    connectWay: yup.string(),
    secretWord: yup.string().required(FIELD_IS_REQUIRED).min(6, TO_SHORT(6)),
    phoneNumber: yup.string().min(19, NUMBER_ERROR),
    email: yup.string().email(EMAIL_ERROR),
    documentType: yup.string().required(FIELD_IS_REQUIRED),
    seriesOfDocument: yup.lazy(() => {
      switch (parentKeys.documentType) {
        case documentTypes[1].name:
          return yup.string().required(FIELD_IS_REQUIRED).min(9, TO_SHORT(9));
        case documentTypes[2].name:
          return yup
            .string()
            .required(FIELD_IS_REQUIRED)
            .matches(/[A-Z]{2}[0-9]{6}|[А-Я]{2}[0-9]{6}/, BOOK_PASSWORD_ERROR);
        default:
          return yup.string().required(FIELD_IS_REQUIRED).min(9, TO_SHORT(9));
      }
    }),
    whoIssued: yup.string().required(FIELD_IS_REQUIRED).min(10, TO_SHORT(10)),
    UNZRquery: yup.string().required(FIELD_IS_REQUIRED).min(13, TO_SHORT(13)),
    validUntil: yup.date().required(FIELD_IS_REQUIRED),
    whenCreated: yup.date().required(FIELD_IS_REQUIRED),
  });

  const validate = validateFormValues(validationSchema);

  return validate;
};

export const onlyNumbers = (value) => value.replace(/\D/gi, '');

export const onlyLettersFirsUppercase = (value) =>
  value
    .toLowerCase()
    .replace(/[0-9]/g, '')
    .replace(/[^a-zа-яїі0-9]/gi, '')
    .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

export const onlyLetters = (value) => value.replace(/[0-9]/g, '').replace(/[^a-zа-яїі0-9]/gi, '');
