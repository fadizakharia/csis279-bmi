export let userState = {
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  errors: null,
} as user;

export const userReducer = (initialState = userState, action: userAction) => {
  switch (action.type) {
    case "LOGOUT":
      return { email: "", firstName: "", id: "", lastName: "" } as user;

    case "SET_USER":
      return { ...initialState, ...action.payload };
    case "SET_USER_ERRORS":
      return { ...initialState, ...action.payload };
    case "CLEAR_USER_ERRORS":
      return { ...initialState, errors: null };
    default:
      return initialState;
  }
};
