import { axios } from ".";

export const loginCall = (email: string, password: string) => {
  const call = axios.post("/login", { email, password });
  return call;
};
export const registerCall = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const call = axios.post("/signup", {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  return call;
};
export const logoutCall = () => {
  const call = axios.post("/logout");
  return call;
};
export const currentUserCall = () => {
  const call = axios.get("/current");
  return call;
};
