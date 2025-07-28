# Router (Sinew or Zenith)

## Architecture

```
import { Pathfinder, Director } from "./router2.js";

const pathfinder2 = new Pathfinder(
    {
        hash: false,
        base: "http://localhost:4000",
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
        hash: false,
        base: "http://localhost:4000",
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
    ],
);

const director1 = new Director()
director1.register("hello.world", function (context, dependencies, pathParams, searchParams) {
    console.log("hello.world director handler", context, dependencies, pathParams, searchParams)
})
director1.register("hello.universe", function (context, dependencies, pathParams, searchParams) {
    console.log("hello.universe director handler", context, dependencies, pathParams, searchParams)
})

const state1 = pathfinder1.URLToState("/hello1/world2?a=30&b=40");
console.log("state1", state1);

const url1 = pathfinder1.stateToURL(state1.name, state1.pathParams, state1.searchParams);
console.log("url1", url1);

pathfinder1.transitionByState("hello.world", { q: 2, w: 1 }, { a: 30, b: 40 }).then(function ({ context, dependencies, name, pathParams, searchParams }) {
    console.log("REACHED", dependencies, name, pathParams, searchParams);
	director1.handle(name, context, dependencies, pathParams, searchParams)
    return pathfinder1.transitionByURL("/hello1/universe3?a=30&b=40").then(function ({ context, dependencies, name, pathParams, searchParams }) {
        console.log("REACHED2", dependencies, name, pathParams, searchParams);
		director1.handle(name, context, dependencies, pathParams, searchParams)
    });
    /*
    return pathfinder1.transitionByState("hello.universe", {q: 1, w: 2, e: 3}, {a: 30, b: 40}).then(function ({ dependencies, name, pathParams, searchParams }) {
        console.log("REACHED2", dependencies, name, pathParams, searchParams)
    })
    */
});

```
