import * as yup from 'yup';

export const recipeValidationSchema = yup.object().shape({
  title: yup.string().required(),
  ingredients: yup.string().required(),
  instructions: yup.string().required(),
  cooking_time: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  community_id: yup.string().nullable().required(),
});
