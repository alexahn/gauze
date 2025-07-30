import { Pathfinder } from "./router.js";

function createPathfinder(context) {
	const hash = false
	const base = "http://localhost:4000"
	const environmentPathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
		},
		[
			{
				name: "environment_root",
				path: [],
				pathRegex: new RegExp("/"),
				pathString: function (groups) {
					return "/";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("environment_root dependency context", context);
					console.log("environment_root dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null
			},
		]
	)
	const proxyPathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
		},
		[
			{
				name: "proxy_root",
				path: [],
				pathRegex: new RegExp("/"),
				pathString: function (groups) {
					return "/";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("proxy_root dependency context", context);
					console.log("proxy_root dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null
			},
		]
	)
	const systemPathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
		},
		[
			{
				name: "system_root",
				path: [],
				pathRegex: new RegExp("/"),
				pathString: function (groups) {
					return "/";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("system_root dependency context", context);
					console.log("system_root dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null,
			},
		]
	)
	const projectPathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
		},
		[
			{
				name: "root",
				path: [],
				pathRegex: new RegExp("/"),
				pathString: function (groups) {
					return "/";
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
			{
				name: "environment",
				path: [],
				pathRegex: new RegExp("/z"),
				pathString: function (groups) {
					return "/z";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("environment dependency context", context);
					console.log("environment dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: environmentPathfinder
			},
			{
				name: "proxy",
				path: [],
				pathRegex: new RegExp("/y"),
				pathString: function (groups) {
					return "/y";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("proxy dependency context", context);
					console.log("proxy dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: proxyPathfinder
			},
			{
				name: "system",
				path: [],
				pathRegex: new RegExp("/x"),
				pathString: function (groups) {
					return "/x";
				},
				search: [],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("system dependency context", context);
					console.log("system dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: systemPathfinder
			},
		]
	)
	const pathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
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
					console.log("project dependency context", context);
					console.log("project dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: projectPathfinder,
			},
		],
	)
	return pathfinder
}

export {
	createPathfinder
}
