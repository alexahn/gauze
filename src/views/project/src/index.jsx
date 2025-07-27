import "./index.css";
import * as React from "react";
//import * as Server from "react-dom/server";
import * as Client from "react-dom/client";

import { Pathfinder, Director, watch } from "./router.js"

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
                return `/hello${groups.w}`;
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
    ],
);

function App({}) {
	return <div>Application</div>;
}

function Navigation({ pathfinder }) {
	console.log('pathfinder', pathfinder)
	return (<div>
		<a href={pathfinder.stateToURL("hello.world", {w : 1, q: 2}, {a: 30, b: 40})}>Hello.World</a>
		<a href={pathfinder.stateToURL("hello.universe", {w: 1,q: 2, e: 3}, {a: 30, b: 50})}>Hello.Universe</a>
	</div>)
}

function World({}) {
	return <div>World</div>
}

function Universe({}) {
	return <div>Universe</div>
}

const root = Client.createRoot(document.getElementById("project"));

const director1 = new Director();
director1.register("hello.world", function (context, dependencies, pathParams, searchParams) {
	console.log("hello.world rendered")
	root.render(
		<React.StrictMode>
			<Navigation pathfinder={pathfinder1} />
			<World/>
		</React.StrictMode>
	)
});
director1.register("hello.universe", function (context, dependencies, pathParams, searchParams) {
	console.log("hello.universe rendered")
	root.render(
		<React.StrictMode>
			<Navigation pathfinder={pathfinder1} />
			<Universe />
		</React.StrictMode>
	)
});

const state = pathfinder1.URLToState("/project/?a=30&b=40#/hello1/world2");
console.log('state', state)
const url = pathfinder1.stateToURL(state.name, state.pathParams, state.searchParams);
console.log('url', url)
const parsedLocationURL = new URL(location.href)
const parsedStateURL = new URL("http://localhost:4000" + url)
parsedLocationURL.hash = parsedStateURL.hash
parsedLocationURL.searchParams = parsedStateURL.searchParams
parsedLocationURL.pathname = parsedStateURL.pathname
//location.href = parsedLocationURL.toString()

watch(pathfinder1, director1)

// strict mode causes an additional render
root.render(
	<React.StrictMode>
		<Navigation pathfinder={pathfinder1} />
	</React.StrictMode>,
);

