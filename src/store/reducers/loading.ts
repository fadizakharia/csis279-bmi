export const isLoading = false;

export const loadingReducer = (
  initialState = isLoading,
  action: loadingAction
) => {
  switch (action.type) {
    case "SET_LOADING":
      return true;
    case "CLEAR_LOADING":
      return false;
    default:
      return initialState;
  }
};
