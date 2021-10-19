interface user {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  errors?: Array<{ field: string; message: string }> | null;
}
type userActionTypes =
  | "SET_USER"
  | "LOGOUT"
  | "SET_USER_ERRORS"
  | "CLEAR_USER_ERRORS";
interface rootReducer {
  user: user;
  loading: boolean;
}
interface userAction {
  type: userActionTypes;
  payload?: user;
}
interface loadingAction {
  type: "SET_LOADING" | "CLEAR_LOADING";
}
