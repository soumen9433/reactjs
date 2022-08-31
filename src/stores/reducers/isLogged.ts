const loggedReducer = (state: any = false, action: any) => {
  switch (action.type) {
    case "SIGN_IN":
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
