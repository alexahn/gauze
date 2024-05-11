import * as React from "react";
import * as Server from "react-dom/server";
import * as Client from "react-dom/client";
import { Provider } from "react-redux";

// singleton only at root level
import router from "./router.js";
import store from "./store.js";
import Route from "./route.jsx";

const root = Client.createRoot(document.getElementById("gauze"));

// strict mode causes an additional render
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<h1>Gauze</h1>
			<div>
				<a href={router.buildUrl("environment.signup", {})}>Sign Up</a>
			</div>
			<div>
				<a href={router.buildUrl("environment.signin", { hello: "goodbye" })}>Sign In</a>
			</div>
			<div>
				<a href={router.buildUrl("environment.signout", { begin: "end" })}>Sign Out</a>
			</div>
			<div>
				<a href={router.buildUrl("system", {})}>System</a>
			</div>
			<Route />
		</Provider>
	</React.StrictMode>,
);

router.setDependencies({ store });

router.start();

console.log("gauze:start");
