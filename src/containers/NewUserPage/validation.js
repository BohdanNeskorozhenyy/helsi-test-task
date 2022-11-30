import * as yup from 'yup';
import { setIn } from 'final-form';
import { useLocalStorage } from '../../lib/hooks/useLocalStorage';
import { FIELD_IS_REQUIRED, TO_SHORT, RNOKPP_ERROR } from '../../constants/validationConstants';

export const useUserValidation = () => {
  const { pageValue: newUserFormRequireds } = useLocalStorage({
    key: 'NEW_USER_FORM_REQUIREDS',
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
    secondName: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT),
    firstName: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT),
    middleName: yup.string().when([], {
      is: () => newUserFormRequireds.middleName,
      then: yup.string().required(FIELD_IS_REQUIRED).min(2, TO_SHORT),
      otherwise: yup.string().notRequired(),
    }),
    taxpayerCard: yup.string().when([], {
      is: () => newUserFormRequireds.taxpayerCard,
      then: yup.string().required(FIELD_IS_REQUIRED).min(10, RNOKPP_ERROR),
      otherwise: yup.string().notRequired(),
    }),
    dateOfBirth: yup.date().required(FIELD_IS_REQUIRED),
  });
  const validate = validateFormValues(validationSchema);

  return validate;
};

export const onlyNumbers = (value) => value.replace(/\D/gi, '');
export const onlyLetters = (value) =>
  value
    .toLowerCase()
    .replace(/[0-9]/g, '')
    .replace(/[^a-zA-Zа-яА_Я0-9 ]/gi, '')
    .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
