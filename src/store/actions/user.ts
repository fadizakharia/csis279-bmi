import { AxiosError, AxiosResponse } from "axios";
import { currentUserCall, loginCall, logoutCall } from "../../api/auth";
import { clearLoadingAction, setLoadingAction } from "./loading";

export const loginAction =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch(setLoadingAction());
    try {
      const res = (await loginCall(email, password)) as AxiosResponse<{
        user: user;
      }>;
      console.log(res);

      if (res) {
        dispatch(clearLoadingAction());
        dispatch({
          type: "SET_USER",
          payload: res.data.user,
        }) as userAction;
      }
    } catch (err: any) {
      console.log(err);

      // if (err.response && err.status === 400) {
      //   const errorFields = await JSON.parse(err.response.message);
      //   dispatch(clearLoadingAction());
      //   dispatch( {
      //     type: "SET_USER_ERRORS",
      //     payload: { errors: errorFields },
      //   } as userAction;
      // } else {
      //   dispatch(clearLoadingAction());
      //   dispatch( {
      //     type: "SET_USER_ERRORS",
      //     payload: {
      //       errors: [
      //         { field: err.response.status, message: err.response.message },
      //       ],
      //     },
      //   } as userAction;
      // }
    }
  };
export const currentUserAction = () => async (dispatch: any) => {
  dispatch(setLoadingAction());
  try {
    const current = (await currentUserCall()) as AxiosResponse<{
      user: user;
    }>;
    if (current.status === 200) {
      console.log(current);

      dispatch(clearLoadingAction());
      dispatch({
        type: "SET_USER",
        payload: current.data.user,
      }) as userAction;
    }
  } catch (err) {
    dispatch(clearLoadingAction());
  }
};
export const logoutAction = () => async (dispatch: any) => {
  dispatch(setLoadingAction());
  try {
    const res = await logoutCall();
    if (res) {
      dispatch(clearLoadingAction());
      dispatch({
        type: "LOGOUT",
      }) as userAction;
    }
  } catch (err: any) {
    if (err) {
      dispatch(clearLoadingAction());
      dispatch({
        type: "SET_USER_ERRORS",
        payload: {
          errors: [
            { field: err.response.status, message: err.response.message },
          ],
        },
      }) as userAction;
    }
  }
};
