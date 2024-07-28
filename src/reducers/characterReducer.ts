import { ReducerAction, CREATE_CHARACTER } from "../actions";
import { IUser } from "../types";

const initialState = {};

const userReducer = (state = initialState, action: ReducerAction) => {
    switch (action.type) {
        case CREATE_CHARACTER:
            return {
                ...state,
                [action.userId!]: action.payload,
            };
        default:
            return state;
    }
}

export default userReducer;