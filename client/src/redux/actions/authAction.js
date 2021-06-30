import { ActionTypes } from "../constants/actionTypes";

export const signIn = (data) => {
	return {
		type: ActionTypes.SIGNIN,
		payload: data,
	};
};
