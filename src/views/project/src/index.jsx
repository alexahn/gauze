import "./index.css";
import "./tachyons.min.css";

import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

import { start } from "./router.js";

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

start(pathfinder, director, {
	name: "project.system.system_root",
	pathParams: {},
	searchParams: {},
});
