import * as yup from 'yup';
import { setIn } from 'final-form';

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

const numbers = /^[a-zA-Z-а-яА-Я']*$/;

const validationSchema = yup.object({
  middleName_isRequired: yup.boolean(),
  secondName: yup
    .string()
    .required("Це поле обов'язкове!")
    .matches(numbers, 'Це поле не може містити спеціальні символи та цифри!')
    .min(2, 'Поле закоротке'),
  firstName: yup
    .string()
    .required("Це поле обов'язкове!")
    .matches(numbers, 'Це поле не може містити спеціальні символи та цифри!')
    .min(2, 'Поле закоротке'),
  middleName: yup
    .string()
    .when('middleName_isRequired', {
      is: (value) => value,
      then: yup.string().required("Це поле обов'язкове!"),
      otherwise: yup.string().notRequired(),
    })
    .matches(numbers, 'Це поле не може містити цифри спеціальні символи та цифри!')
    .min(2, 'Поле закоротке'),
});

export const validate = validateFormValues(validationSchema);
