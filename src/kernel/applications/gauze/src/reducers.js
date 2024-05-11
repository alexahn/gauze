import { router5Reducer, actions, actionTypes as router5ActionTypes } from "redux-router5";
import { createStore, applyMiddleware, combineReducers } from "redux";

import routes from "./routes.js";

const reducers = combineReducers({
	router: router5Reducer,
	view: viewReducer,
	// ...add your other reducers
});

function viewReducer(state = {}, action) {
	console.log("action", action);
	if (action.type === router5ActionTypes.TRANSITION_SUCCESS) {
		// find the route
		const route = routes.find(function (r) {
			return r.name === action.payload.route.name;
		});
		if (route) {
			state = {
				layout: route.layout,
				sections: route.sections,
				units: route.units,
			};
			return state;
		} else {
			// this should never happen
			throw new Error("Internal error: invalid route");
		}
	} else {
		return state;
	}
}

export default reducers;
