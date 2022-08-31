const languageReducer = (state: any = "en", action: any) => {
  switch (action.type) {
    case "TRANSLATE_TO":
      return action.payload;
    default:
      return state;
  }
};

export default languageReducer;
