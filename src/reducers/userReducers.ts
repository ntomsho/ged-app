import { SET_USER, ReducerAction, CREATE_USER } from "../actions";
import { IUser } from "../types";

const initialState = null;

const userReducer = (state = initialState, action: ReducerAction) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        case CREATE_USER:
            const user: IUser = {
                displayName: action.payload.displayName,
                userAuth: action.payload,
                characters: [],
            };
            return user;
        default:
            return state;
    }
}

export default userReducer;