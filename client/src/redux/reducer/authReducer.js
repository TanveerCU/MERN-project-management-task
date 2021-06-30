import { ActionTypes } from "../constants/actionTypes";

export const signInReducer = (state = "", { type, payload }) => {
	switch (type) {
		case ActionTypes.SIGNIN:
			return payload;
		default:
			return state;
	}
};
