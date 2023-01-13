import { combineReducers, legacy_createStore as createStore } from "redux";

export interface IRootState {}

export const rootReducer = combineReducers<IRootState>({});

const store = createStore(rootReducer);

export default store;