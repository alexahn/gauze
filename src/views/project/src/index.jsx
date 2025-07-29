import "./index.css";
import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

import { Pathfinder, Director, start } from "./router.js";

const helloPathfinder = new Pathfinder(
	{
		hash: false,
		base: "http://localhost:4000",
		//basePath: "/project/",
		context: {},
	},
	[
		{
			name: "world",
			path: ["w"],
			pathRegex: new RegExp("/world(?<w>.*)"),
			pathString: function (groups) {
				return `/world${groups.w}`;
			},
			search: ["b"],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("world dependency context", context);
				console.log("world dependency called", dependencies, state, routeParams, searchParams);
				return {
					y: 20,
				};
			},
		},
		{
			name: "universe",
			path: ["e"],
			pathRegex: new RegExp("/universe(?<e>.*)"),
			pathString: function (groups) {
				return `/universe${groups.e}`;
			},
			search: ["b"],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("universe dependency context", context);
				console.log("universe dependency called", dependencies, state, routeParams, searchParams);
				return {
					z: 30,
				};
			},
		},
	],
);

var projectPathfinder = new Pathfinder(
	{
		hash: false,
		base: "http://localhost:4000",
		//basePath: "/project/",
		context: {},
	},
	[
		{
			name: "root",
			path: [],
			pathRegex: new RegExp("/"),
			pathString: function (groups) {
				return "/"
			},
			search: [],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("root dependency context", context)
				console.log("root dependency called", dependencies, state, routeParams, searchParams)
				/*
				const err = new Error("Transition")
				err.transitionByState = {
					name: "hello.world",
					pathParams: {q: 2, w: 1},
					searchParams: {a: 30, b: 40}
				}
				throw err
				*/
				return {}
			},
			pathfinder: null
		},
		{
			name: "hello",
			path: ["q"],
			pathRegex: new RegExp("/hello(?<q>.*?)/"),
			pathString: function (groups) {
				return `/hello${groups.q}/`
			},
			search: ["a"],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("hello dependency context", context)
				console.log("hello dependency called", dependencies, state, routeParams, searchParams)
				return {
					x: 10
				}
			},
			pathfinder: helloPathfinder,
		}
	]
)

var pathfinder1 = new Pathfinder(
	{
		hash: false,
		base: "http://localhost:4000",
		//basePath: "/project/",
		context: {},
	},
	[
		{
			name: "project",
			path: [],
			pathRegex: new RegExp("/project"),
			pathString: function (groups) {
				return `/project`;
			},
			search: [],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("project dependency context", context)
				console.log("project dependency called", dependencies, state, routeParams, searchParams)
				return {}
			},
			pathfinder: projectPathfinder,
		},
	],
);

function App({}) {
	return <div>Application</div>;
}

function Navigation({ pathfinder }) {
	console.log("pathfinder", pathfinder);
	return (
		<ul>
			<li><a href={pathfinder.stateToURL("project.hello.world", { w: 1, q: 2 }, { a: 30, b: 40 })}>project.hello.world 1</a></li>
			<li><a href={pathfinder.stateToURL("project.hello.universe", { w: 1, q: 2, e: 3 }, { a: 30, b: 40 })}>project.hello.universe 1</a></li>
			<li><a href={pathfinder.stateToURL("project.hello.world", { w: 1, q: 2 }, { a: 30, b: 50 })}>project.hello.world 2</a></li>
			<li><a href={pathfinder.stateToURL("project.hello.universe", { w: 1, q: 2, e: 3 }, { a: 30, b: 50 })}>project.hello.universe 2</a></li>
		</ul>
	);
}

function World({}) {
	return <div>World</div>;
}

function Universe({}) {
	return <div>Universe</div>;
}

const root = Client.createRoot(document.getElementById("project"));

function Layout({ children }) {
	if (Array.isArray(children)) {
		return (
			<div>
				{children[0] ? (
					<div>
						<h1>Header</h1>
						<div>{children[0]}</div>
					</div>
				) : null}
				{children[1] ? (
					<div>
						<h1>Body</h1>
						<div>{children[1]}</div>
					</div>
				) : null}
			</div>
		);
	} else {
		return (
			<div>
				<div>
					<h1>Header</h1>
					<div>{children}</div>
				</div>
			</div>
		);
	}
}

const director1 = new Director();
director1.register("project.hello.world", function (context, dependencies, pathParams, searchParams) {
	console.log("project.hello.world rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
				<World />
			</Layout>
		</React.StrictMode>,
	);
});
director1.register("project.hello.universe", function (context, dependencies, pathParams, searchParams) {
	console.log("project.hello.universe rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
				<Universe />
			</Layout>
		</React.StrictMode>,
	);
});
director1.register("project.root", function (context, dependencies, pathParams, searchParams) {
	console.log("project.root rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
			</Layout>
		</React.StrictMode>,
	);
});

start(pathfinder1, director1, {
	name: "project.root",
	pathParams: {},
	searchParams: {},
});

// strict mode causes an additional render
/*
root.render(
	<React.StrictMode>
		<Navigation pathfinder={pathfinder1} />
	</React.StrictMode>,
);
*/
