import { combineReducers } from "redux";
import Modal from "./slices/modal";
import User from "./slices/user";
import Auth from "./slices/auth";
const reducers = combineReducers({
    [Modal.name]: Modal.reducer,
    [User.name]: User.reducer,
    [Auth.name]: Auth.reducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;