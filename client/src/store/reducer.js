import { combineReducers } from "redux";

// reducer import
import storeReducer from "./reducers/store.reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  store: storeReducer,
});

export default reducer;
