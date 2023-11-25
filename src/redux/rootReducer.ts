import storage from "redux-persist/lib/storage";
import { graphPersistConfig}  from "./slices/graph";
import graphSlice from "./slices/graph";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const reducers = {
  graph: persistReducer(graphPersistConfig, graphSlice),
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
