import { combineReducers } from "redux";
import Modal from "./slices/modal";
import User from "./slices/user";
import Problem from "./slices/problem";
const reducers = combineReducers({
    [Modal.name]: Modal.reducer,
    [User.name]: User.reducer,
    [Problem.name]: Problem.reducer
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;