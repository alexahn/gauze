import "./index.css";
import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

import { Pathfinder, Director, start } from "./router.js";

const pathfinder2 = new Pathfinder(
	{
		hash: true,
		base: "http://localhost:4000",
		basePath: "/project/",
		context: {},
	},
	[
		{
			name: "world",
			path: ["q"],
			pathRegex: new RegExp("/world(?<q>.*)"),
			pathString: function (groups) {
				return `/world${groups.q}`;
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

var pathfinder1 = new Pathfinder(
	{
		hash: true,
		base: "http://localhost:4000",
		basePath: "/project/",
		context: {},
	},
	[
		{
			name: "hello",
			path: ["w"],
			pathRegex: new RegExp("/hello(?<w>.*?)/"),
			pathString: function (groups) {
				return `/hello${groups.w}/`;
			},
			search: ["a"],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("hello dependency context", context);
				console.log("hello dependency called", dependencies, state, routeParams, searchParams);
				return {
					x: 10,
				};
			},
			pathfinder: pathfinder2,
		},
		{
			name: "root",
			path: [],
			pathRegex: new RegExp("/"),
			pathString: function (groups) {
				return `/`;
			},
			search: [],
			dependencies: async function (context, dependencies, state, routeParams, searchParams) {
				console.log("root dependency context", context);
				console.log("root dependency called", dependencies, state, routeParams, searchParams);
				/*
				const err = new Error("Transition")
				err.transitionByState = {
					name: "hello.world",
					pathParams: {q: 2, w: 1},
					searchParams: {a: 30, b: 40}
				}
				throw err
				*/
				return {};
			},
			pathfinder: null,
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
			<li><a href={pathfinder.stateToURL("hello.world", { w: 1, q: 2 }, { a: 30, b: 40 })}>hello.world 1</a></li>
			<li><a href={pathfinder.stateToURL("hello.universe", { w: 1, q: 2, e: 3 }, { a: 30, b: 40 })}>hello.universe 1</a></li>
			<li><a href={pathfinder.stateToURL("hello.world", { w: 1, q: 2 }, { a: 30, b: 50 })}>hello.world 2</a></li>
			<li><a href={pathfinder.stateToURL("hello.universe", { w: 1, q: 2, e: 3 }, { a: 30, b: 50 })}>hello.universe 2</a></li>
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
director1.register("hello.world", function (context, dependencies, pathParams, searchParams) {
	console.log("hello.world rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
				<World />
			</Layout>
		</React.StrictMode>,
	);
});
director1.register("hello.universe", function (context, dependencies, pathParams, searchParams) {
	console.log("hello.universe rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
				<Universe />
			</Layout>
		</React.StrictMode>,
	);
});
director1.register("root", function (context, dependencies, pathParams, searchParams) {
	console.log("root rendered");
	root.render(
		<React.StrictMode>
			<Layout>
				<Navigation pathfinder={pathfinder1} />
			</Layout>
		</React.StrictMode>,
	);
});

start(pathfinder1, director1, {
	name: "root",
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
