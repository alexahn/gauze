import { router5Reducer, actions, actionTypes as router5ActionTypes } from "redux-router5";
import { createStore, applyMiddleware, combineReducers } from "redux";

import routes from "./routes.js";

import * as services from "./services/index.js";

const initialState = {
	services: services,
};

const reducers = combineReducers({
	...initialState,
	router: router5Reducer,
	view: viewReducer,
});

function viewReducer(state = {}, action) {
	if (action.type === router5ActionTypes.TRANSITION_SUCCESS) {
		// find the route
		const route = routes.find(function (r) {
			return r.name === action.payload.route.name;
		});
		if (route) {
			return {
				...state,
				layout: route.layout,
				sections: route.sections,
				units: route.units,
			};
		} else {
			// this should never happen
			throw new Error("Internal error: invalid route");
		}
	} else {
		return state;
	}
}

export default reducers;
