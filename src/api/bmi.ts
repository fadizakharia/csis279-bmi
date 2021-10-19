import { axios } from ".";

export const getUserBmiCall = () => {
  const call = axios.get("/bmi");
  return call;
};
export const addBmiCall = (weight: number, height: number) => {
  const call = axios.post("/bmi", { weight, height });
  return call;
};
export const deleteBmiCall = (bmiId: string) => {
  const call = axios.delete("/bmi", { params: { bmiId } });
  return call;
};
