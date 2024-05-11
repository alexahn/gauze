import * as React from "react";
import * as Server from "react-dom/server";
import * as Client from "react-dom/client";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, combineReducers } from "redux";
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import { router5Reducer, router5Middleware } from "redux-router5";

import transitionPath from "router5-transition-path";

const dataMiddlewareFactory = (routes) => (router) => (toState, fromState) => {
	const { toActivate } = transitionPath(toState, fromState);
	const onActivateHandlers = toActivate.map((segment) => routes.find((r) => r.name === segment).onActivate).filter(Boolean);

	return Promise.all(onActivateHandlers.map((callback) => callback())).then((data) => {
		const routeData = data.reduce((accData, rData) => Object.assign(accData, rData), {});
		return { ...toState, data: routeData };
	});
};

const routes = [
	{
		name: "root",
		path: "/",
		onActivate: function (params) {
			console.log("ROOT ACTIVATE", params);
			return Promise.resolve(true);
		},
	},
	{
		name: "users",
		path: "/users",
		onActivate: function (params) {
			console.log("USERS ACTIVATE", params);
			return Promise.resolve(true);
		},
	},
	{
		name: "users.id",
		path: "/:id",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
	},
	{
		name: "users.id.home",
		path: "/home",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
	},
	{
		name: "users.view",
		path: "/view",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
	},
	{
		name: "users.list",
		path: "/list",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
	},
	{
		name: "system",
		path: "/system",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
	},
];
const options = {
	//defaultRoute: ''
};

const router = createRouter(routes, options);

router.usePlugin(
	browserPlugin({
		useHash: true,
	}),
);
router.useMiddleware(dataMiddlewareFactory(routes));

router.start();
//router.start('/users');

//console.log('router', router)

const createStoreWithMiddleware = applyMiddleware(router5Middleware(router))(createStore);

// router.buildUrl(name, params)

const action = {
	type: "ACTION",
	payload: {
		x: 10,
	},
};

const reducers = combineReducers({
	router: router5Reducer,
	user: userReducer,
	// ...add your other reducers
});

function userReducer(state = {}, action) {
	console.log("action", action);
	return state;
}

const logger = (store) => (next) => (action) => {
	console.log("dispatching", action);
	let result = next(action);
	console.log("next state", store.getState());
	console.log("router", router);
	return result;
};

const store = createStore(reducers, applyMiddleware(router5Middleware(router), logger));
//const store = createStoreWithMiddleware(reducers)

store.dispatch(action);

console.log(store.getState());

let Greet = () => <h1>Hello, world!</h1>;
console.log(Server.renderToString(<Greet />));
console.log("change");

/*
const root = Client.createRoot(document.getElementById("gauze"));
const element = <div>
	<h1>Hello, world</h1>
	<a href={router.buildUrl("root", {})}>Root</a>
	<a href={router.buildUrl('users', {})}>Users</a>
	<a href={router.buildUrl("users.view", {})}>View</a>
	<a href={router.buildUrl("users.list", {})}>List</a>
</div>;
root.render(element);
*/

const root = Client.createRoot(document.getElementById("gauze"));

root.render(
	// Render a `<Provider>` around the entire `<App>`,
	// and pass the Redux store to it as a prop
	<React.StrictMode>
		<Provider store={store}>
			{/* <App /> */}
			<h1>Hello World!</h1>
			<a href={router.buildUrl("root", {})}>Root</a>
			<a href={router.buildUrl("users", {})}>Users</a>
			<a href={router.buildUrl("users.view", {})}>View</a>
			<a href={router.buildUrl("users.list", {})}>List</a>
		</Provider>
	</React.StrictMode>,
);

router.navigate("system", {});
console.log(store.getState());

router.navigate("users.list", {});
console.log(store.getState());

router.navigate("users.id.home", { id: 10 });
