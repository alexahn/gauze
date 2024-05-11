import * as React from "react";
import * as Server from "react-dom/server";
import * as Client from "react-dom/client";
import { Provider } from "react-redux";

// singleton only at root level
import router from "./router.js";
import store from "./store.js";
import Route from "./route.jsx";

const root = Client.createRoot(document.getElementById("gauze"));

root.render(
	// Render a `<Provider>` around the entire `<App>`,
	// and pass the Redux store to it as a prop
	<React.StrictMode>
		<Provider store={store}>
			<Route />
			<h1>Hello World!</h1>
			<a href={router.buildUrl("root", {})}>Root</a>
			<a href={router.buildUrl("users", {})}>Users</a>
			<a href={router.buildUrl("users.view", { hello: "goodbye" })}>View</a>
			<a href={router.buildUrl("users.view", { begin: "end" })}>List</a>
			<a href={router.buildUrl("system", {})}>System</a>
		</Provider>
	</React.StrictMode>,
);

router.start();

console.log("LOADED");
