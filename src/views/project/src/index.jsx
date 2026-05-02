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

const root = Client.createRoot(document.getElementById("project"));

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

function normalizeApplicationError(error) {
	if (error instanceof Error) {
		return error;
	} else if (typeof error === "string") {
		return new Error(error);
	} else if (error === null) {
		return new Error("Unknown error");
	} else if (typeof error === "undefined") {
		return new Error("Unknown error");
	} else {
		try {
			return new Error(JSON.stringify(error));
		} catch (err) {
			return new Error(String(error));
		}
	}
}

function isNavigationError(error) {
	if (error.message === "Cannot send request without proxy JWT") {
		return true;
	} else if (error.message === "Cannot send request without system JWT") {
		return true;
	} else if (error.message === "Proxy JWT could not be found") {
		return true;
	} else if (error.message === "System JWT could not be found") {
		return true;
	} else {
		return false;
	}
}

function renderApplicationError(error, source) {
	const normalized = normalizeApplicationError(error);
	root.render(
		<React.StrictMode>
			<components.error_boundary.default resetKey="application.error" pathfinder={pathfinder}>
				<components.error.default error={normalized} pathfinder={pathfinder} source={source} />
			</components.error_boundary.default>
		</React.StrictMode>,
	);
}

window.addEventListener("error", function (event) {
	const error = normalizeApplicationError(event.error || event.message);
	if (isNavigationError(error)) {
	} else {
		event.preventDefault();
		console.error("APPLICATION ERROR", error);
		renderApplicationError(error, "Runtime error");
	}
});

window.addEventListener("unhandledrejection", function (event) {
	const error = normalizeApplicationError(event.reason);
	if (isNavigationError(error)) {
	} else {
		event.preventDefault();
		console.error("UNHANDLED PROMISE REJECTION", error);
		renderApplicationError(error, "Async error");
	}
});

start(pathfinder, director, {
	initial: {
		name: "project.system.headers.graph",
		pathParams: {},
		searchParams: {},
	},
	error: {
		name: "project.error",
		pathParams: {},
		searchParams: {},
	},
	push: true,
	retry: 4,
});
