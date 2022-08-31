import {createStore} from "redux";
import {History} from "history";
import rootReducer from "./rootReducer";

const rootStore = (initialState: any, history: History) => {
  const store = createStore(rootReducer(history), initialState);

  // store.subscribe(() => console.log(store.getState()));

  return store;
};

export default rootStore;
