import {combineReducers} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";


export const globalStore = combineReducers({
    [api.reducerPath]: api.reducer
})