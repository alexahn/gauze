import "./index.css";
import "./tachyons.min.css";

import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

import { start } from "@ahn/sinew";

import * as services from "./services/index.js";
import * as layouts from "./layouts/index.js";
import * as components from "./components/index.js";

import { createPathfinder } from "./pathfinder.js";
import { createDirector } from "./director.jsx";

const root = Client.createRoot(document.getElementById("gauze"));

const pathfinderContext = {
	services,
};
const pathfinder = createPathfinder(pathfinderContext);

// set pathfinder on gauze
services.gauze.default.setPathfinder(pathfinder);

const directorContext = {
	services,
	root,
	layouts,
	components,
	pathfinder,
};
const director = createDirector(directorContext);

function renderApplicationError(error, source) {
	root.render(
		<React.StrictMode>
			<components.error_boundary.default resetKey="application.error" pathfinder={pathfinder}>
				<components.error.default error={error} pathfinder={pathfinder} source={source} />
			</components.error_boundary.default>
		</React.StrictMode>,
	);
}

window.addEventListener("error", function (event) {
	const error = event.error || event.message;
	event.preventDefault();
	console.error("APPLICATION ERROR", error);
	renderApplicationError(error, "Runtime error");
});

window.addEventListener("unhandledrejection", function (event) {
	event.preventDefault();
	console.error("UNHANDLED PROMISE REJECTION", event.reason);
	renderApplicationError(event.reason, "Async error");
});

start(pathfinder, director, {
	initial: {
		name: "gauze.system.headers.graph",
		pathParams: {},
		searchParams: {},
	},
	error: {
		name: "gauze.error",
		pathParams: {},
		searchParams: {},
	},
	push: true,
	retry: 4,
});
