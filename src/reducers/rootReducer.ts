import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducers";

const rootReducer = combineReducers({ user: userReducer });

export default rootReducer;