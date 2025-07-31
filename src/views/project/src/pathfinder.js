import { Pathfinder } from "./router.js";

function createPathfinder(context) {
	const hash = false;
	const base = "http://localhost:4000";
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
				pathfinder: null,
			},
			{
				name: "signup",
				path: [],
				pathRegex: new RegExp("/signup"),
				pathString: function (groups) {
					return "/signup";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("signup dependency context", context);
					console.log("signup dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null,
			},
			{
				name: "signin",
				path: [],
				pathRegex: new RegExp("/signin"),
				pathString: function (groups) {
					return "/signin";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("signin dependency context", context);
					console.log("signin dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null,
			},
		],
	);
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
				pathfinder: null,
			},
			{
				name: "signout",
				path: [],
				pathRegex: new RegExp("/signout"),
				pathString: function (groups) {
					return "/signout";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("signout dependency context", context);
					console.log("signout dependency called", dependencies, state, routeParams, searchParams);
					return {};
				},
				pathfinder: null,
			},
			{
				name: "proxies",
				path: [],
				pathRegex: new RegExp("/proxies"),
				pathString: function (groups) {
					return "/proxies";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, routeParams, searchParams) {
					console.log("proxies dependency context", context);
					console.log("proxies dependency called", dependencies, state, routeParams, searchParams);
					const { services, pathfinder } = context;
					const { gauze } = services;
					//return {};
					return gauze.default.proxies().then(function (proxies) {
						console.log("proxies", proxies);
						return { proxies };
					});
				},
				pathfinder: null,
			},
		],
	);
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
		],
	);
	const projectPathfinder = new Pathfinder(
		{
			hash,
			base,
			context,
		},
		[
			/*
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
					const err = new Error("Transition")
					err.transitionByState = {
						name: "hello.world",
						pathParams: {q: 2, w: 1},
						searchParams: {a: 30, b: 40}
					}
					throw err
				},
				pathfinder: null,
			},
			*/
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
					const { services } = context;
					const { gauze } = services;
					const jwt = gauze.default.getEnvironmentJWT();
					if (jwt) {
						console.log("existing environment jwt found!", jwt);
						return {
							jwt,
						};
					} else {
						return gauze.default.enterEnvironmentSession().then(function (session) {
							console.log("entering environment session!", session);
							gauze.default.setEnvironmentJWT(session.gauze__session__value);
							return {
								jwt: session.gauze__session__value,
							};
						});
					}
				},
				pathfinder: environmentPathfinder,
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
					const { services, pathfinder } = context;
					const { gauze } = services;
					const jwt = gauze.default.getProxyJWT();
					if (jwt) {
						console.log("existing proxy jwt found!", jwt);
						return {
							jwt,
						};
					} else {
						const next = location.href;
						// transition to sign in
						location.replace(pathfinder.stateToURL("project.environment.signin", {}, { next }));
						throw new Error("Proxy JWT could not be found");
					}
				},
				pathfinder: proxyPathfinder,
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
					const { services, pathfinder } = context;
					const { gauze } = services;
					const jwt = gauze.default.getSystemJWT();
					if (jwt) {
						console.log("existing system jwt found!", jwt);
						return {
							jwt,
						};
					} else {
						const next = location.href;
						// transition to sign in
						location.replace(pathfinder.stateToURL("project.proxy.proxies", {}, { next }));
						throw new Error("System JWT could not be found");
					}
				},
				pathfinder: systemPathfinder,
			},
		],
	);
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
	);
	return pathfinder;
}

export { createPathfinder };
