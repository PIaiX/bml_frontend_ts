import { applyMiddleware, createStore } from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducers from "./reducers/index";

const initialState = {};

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;