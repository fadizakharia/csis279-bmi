import * as yup from "yup";

export const addBmiSchema = yup.object().shape({
  height: yup.number().min(1).max(3),
  weight: yup.number().min(30).max(500),
});
export const deleteBmiSchema = yup.object().shape({
  bmiId: yup.string().uuid(),
});
