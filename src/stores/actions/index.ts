export const increment = (number: number) => {
  return {
    type: "INCREMENT",
    payload: number
  };
};
export const decrement = () => {
  return {
    type: "DECREMENT"
  };
};
export const translateTo = (language: string) => {
  return {
    type: "TRANSLATE_TO",
    payload: language
  };
};
