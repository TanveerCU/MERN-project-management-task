import { combineReducers } from "redux";
import { signInReducer } from "./authReducer";

export const rootReducer = combineReducers({
	signInReducer,
});
