import { User } from "firebase/auth";
import { ICharacter, IUser } from "./types";

export type ReducerAction = {
    type: string;
    payload: any;
    userId?: string;
}

export const SET_USER = 'SET_USER';
export const CREATE_USER = 'CREATE_USER';

export const setUser = (user: IUser): ReducerAction => {
    return {
        type: SET_USER,
        payload: user,
    };
}

export const createUser = (userAuth: User): ReducerAction => {
    return {
        type: CREATE_USER,
        payload: userAuth,
    }
}

export const CREATE_CHARACTER = 'CREATE_CHARACTER';

export const createCharacter = (character: ICharacter, userId: string): ReducerAction => {
    return {
        type: CREATE_CHARACTER,
        payload: character,
        userId,
    };
}