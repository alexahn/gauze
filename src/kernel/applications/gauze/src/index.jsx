import "./index.css";
import "./tachyons.min.css";

import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";
import { Provider } from "react-redux";

// singleton only at root level
import router from "./router.js";
import store from "./store.js";
import Route from "./route.jsx";

import * as services from "./services/index.js";

const root = Client.createRoot(document.getElementById("gauze"));

// strict mode causes an additional render
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Route />
		</Provider>
	</React.StrictMode>,
);

router.setDependencies({ store, services });

router.start();

console.log("gauze:start");

/*
const worker = new Worker("worker.js");
setInterval(function () {
	// kind of defeats the purpose of using workers when we need to be able to make a structured clone of the message
	// since it means that we are one step away from being able to put it in local storage
	worker.postMessage(services.graph)
}, 512)
*/
