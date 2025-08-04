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
				name: "signup",
				path: [],
				pathRegex: new RegExp("/signup"),
				pathString: function (groups) {
					return "/signup";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("signup dependency context", context);
					console.log("signup dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("signin dependency context", context);
					console.log("signin dependency called", dependencies, state, pathParams, searchParams);
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
				name: "signout",
				path: [],
				pathRegex: new RegExp("/signout"),
				pathString: function (groups) {
					return "/signout";
				},
				search: ["next"],
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("signout dependency context", context);
					console.log("signout dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("proxies dependency context", context);
					console.log("proxies dependency called", dependencies, state, pathParams, searchParams);
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
				name: "headers",
				path: [],
				pathRegex: new RegExp("/headers"),
				pathString: function (groups) {
					return "/headers";
				},
				search: [],
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("headers dependency context", context);
					console.log("headers dependency called", dependencies, state, pathParams, searchParams);
					const { services, pathfinder } = context;
					const { gauze } = services;
					return gauze.default.header().then(function (headers) {
						console.log("headers", headers);
						return {
							headers,
						};
					});
					//return {};
				},
				pathfinder: new Pathfinder(
					{
						hash,
						base,
						context,
					},
					[
						{
							name: "header",
							path: ["header"],
							pathRegex: new RegExp("/(?<header>.*?)/"),
							pathString: function (groups) {
								return `/${groups.header}/`;
							},
							search: [],
							dependencies: async function (context, dependencies, state, pathParams, searchParams) {
								const header = dependencies.headers.headers.find(function (header) {
									// note: force both to lower case
									return header.graphql_meta_type.toLowerCase() === pathParams.header.toLowerCase();
								});
								if (header) {
									return {
										header,
									};
								} else {
									throw new Error("Header could not be found");
								}
							},
							pathfinder: new Pathfinder(
								{
									hash,
									base,
									context,
								},
								[
									{
										name: "list",
										path: [],
										pathRegex: new RegExp("/list"),
										pathString: function (groups) {
											return `/list`;
										},
										search: ["variables"],
										dependencies: async function (context, dependencies, state, pathParams, searchParams) {
											console.log("dependencies", dependencies);
											const header = dependencies.header.header;
											const { services } = context;
											const { gauzemodel } = services;
											const variables = JSON.parse(searchParams.variables);
											const read = gauzemodel.default
												.read(header, variables)
												.then(function (items) {
													return {
														items,
													};
												})
												.catch(function (err) {
													// todo: filter errors here so we only act on proper errors
													// note: we are going to return an empty array because some entities have restrictions on how they can be queried (e.g. relationships requires from_entity_id or to_entity_id as an example)
													// note: figure out if we can loosen those restrictions (and short circuit the query on the backend)
													// note: either we do it here, and the code is ugly here, or we make the code ugly on the backend
													// note: i think it's better to make it ugly here
													return {
														items: [],
													};
												});
											const count = gauzemodel.default
												.count(header, variables)
												.then(function (counts) {
													return {
														count: counts[0].count,
													};
												})
												.catch(function (err) {
													return {
														count: 0,
													};
												});
											return Promise.all([read, count]).then(function (results) {
												const readResult = results[0];
												const countResult = results[1];
												return {
													items: readResult.items,
													count: countResult.count,
												};
											});
										},
										pathfinder: null,
									},
									{
										name: "create",
										path: [],
										pathRegex: new RegExp("/create"),
										pathString: function (groups) {
											return `/create`;
										},
										search: [],
										dependencies: async function (context, dependencies, state, pathParams, searchParams) {},
										pathfinder: null,
									},
									{
										name: "item",
										path: ["id"],
										pathRegex: new RegExp("/item/(?<id>.*)"),
										pathString: function (groups) {
											return `/item/${groups.id}`;
										},
										search: [],
										dependencies: async function (context, dependencies, state, pathParams, searchParams) {
											const { services } = context
											const { gauzemodel } = services
											const { id } = pathParams
											const header = dependencies.header.header
											const variables = {
												where: {
													[header.primary_key]: id
												}
											}
											return gauzemodel.default.read(header, variables).then(function (rows) {
												if (rows && rows.length) {
													return {
														item: rows[0]
													}
												} else {
													return {
														item: undefined
													}
												}
											}).catch(function (err) {
												console.error(err)
												return {
													item: undefined
												}
											})
										},
										pathfinder: null,
									},
								],
							),
						},
					],
				),
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("root dependency context", context);
					console.log("root dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("environment dependency context", context);
					console.log("environment dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("proxy dependency context", context);
					console.log("proxy dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("system dependency context", context);
					console.log("system dependency called", dependencies, state, pathParams, searchParams);
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
				dependencies: async function (context, dependencies, state, pathParams, searchParams) {
					console.log("project dependency context", context);
					console.log("project dependency called", dependencies, state, pathParams, searchParams);
					return {};
				},
				pathfinder: projectPathfinder,
			},
		],
	);
	return pathfinder;
}

export { createPathfinder };
