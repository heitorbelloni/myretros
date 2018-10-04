import { applyMiddleware, createStore, Store } from "redux";
import { RetroReducers } from "./reducers";
import thunk from "redux-thunk";
import { ApplicationState } from ".";
import { signalR } from "./signalR";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";
import { history } from "./history";

export const store = createStore(
    RetroReducers,
    composeWithDevTools(applyMiddleware(thunk, signalR, routerMiddleware(history)))
) as Store<ApplicationState>;
