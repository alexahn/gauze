import { router5Reducer, actions, actionTypes as router5ActionTypes } from "./modules/redux-router5/dist/index.es.js";
//import { router5Reducer, actions, actionTypes as router5ActionTypes } from "redux-router5";
import { createStore, applyMiddleware, combineReducers } from "redux";

import routes from "./routes.js";

import * as services from "./services/index.js";

const reducers = combineReducers({
	router: router5Reducer,
	view: viewReducer,
	services: servicesReducer,
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

function servicesReducer(state = services, action) {
	return state;
}

export default reducers;
