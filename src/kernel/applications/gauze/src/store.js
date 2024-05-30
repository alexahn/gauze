import { createStore, applyMiddleware } from "redux";
import { router5Middleware } from "./redux-router5/dist/index.es.js";

import router from "./router.js";
import reducers from "./reducers.js";

const logger = (store) => (next) => (action) => {
	console.log("dispatching", action);
	let result = next(action);
	console.log("next state", store.getState());
	return result;
};

const store = createStore(reducers, applyMiddleware(router5Middleware(router), logger));

export default store;
