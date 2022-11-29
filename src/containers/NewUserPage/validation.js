import * as yup from 'yup';
import { setIn } from 'final-form';
import { useLocalStorage } from '../../lib/hooks/useLocalStorage';
import {
  FIELD_IS_REQUIRED,
  NUMBERS_NOT_ALLOWED,
  TO_SHORT,
} from '../../constants/validationConstants';

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

  const NUMBERS = /^[a-zA-Z-а-яА-Я']*$/;

  const validationSchema = yup.object({
    secondName: yup
      .string()
      .required(FIELD_IS_REQUIRED)
      .matches(NUMBERS, NUMBERS_NOT_ALLOWED)
      .min(2, TO_SHORT),
    firstName: yup
      .string()
      .required(FIELD_IS_REQUIRED)
      .matches(NUMBERS, NUMBERS_NOT_ALLOWED)
      .min(2, TO_SHORT),
    middleName: yup
      .string()
      .when([], {
        is: () => newUserFormRequireds.middleName,
        then: yup.string().required(FIELD_IS_REQUIRED),
        otherwise: yup.string().notRequired(),
      })
      .matches(NUMBERS, NUMBERS_NOT_ALLOWED)
      .min(2, TO_SHORT),
  });
  const validate = validateFormValues(validationSchema);

  return validate;
};
