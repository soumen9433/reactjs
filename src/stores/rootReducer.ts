import {combineReducers, Reducer, ReducersMapObject} from "redux";
import {History} from "history";
import counterReducer from "./reducers/counter";
import loggedReducer from "./reducers/isLogged";
import languageReducer from "./reducers/selectedLanguage";

const rootReducer = (history: History): Reducer => {
  const reducerMap: ReducersMapObject = {
    counter: counterReducer,
    isLogged: loggedReducer,
    selectedLanguage: languageReducer
  };

  return combineReducers(reducerMap);
};

export default rootReducer;
