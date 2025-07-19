import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

import { PAGINATION_PAGE_SIZE } from "./constants.js";

import * as components from "./components/index.js";
import * as orchestrate from "./orchestrate.js";

const routes = [
	{
		name: "environment",
		path: "/z",
		onActivate: function ({ dependencies }) {
			const { services } = dependencies;
			const { gauze, model } = services;
			const environmentJWT = gauze.default.getEnvironmentJWT();
			if (environmentJWT) {
				// check expiration
				const now = new Date().getTime() / 1000;
				const decoded = jose.decodeJwt(environmentJWT);
				if (now < decoded.exp) {
					// valid
					return Promise.resolve(true);
				} else {
					// invalid
					gauze.default.deleteEnvironmentJWT();
					return gauze.default.enterSession(null).then(function (session) {
						model.default.create("SESSION", session.gauze__session__id, session);
						gauze.default.setEnvironmentJWT(session.gauze__session__value);
						return Promise.resolve(true);
					});
				}
			} else {
				return gauze.default.enterSession(null).then(function (session) {
					model.default.create("SESSION", session.gauze__session__id, session);
					gauze.default.setEnvironmentJWT(session.gauze__session__value);
					return Promise.resolve(true);
				});
			}
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "environment.signup",
		path: "/signup",
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alpaca.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner3.default,
			},
			bottom: {
				body: units.amethyst.default,
			},
		},
	},
	{
		name: "environment.signin",
		path: "/signin?next",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alpaca.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner3.default,
			},
			bottom: {
				body: units.amber.default,
			},
		},
	},
	{
		name: "environment.signout",
		path: "/signout",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alpaca.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner3.default,
			},
			bottom: {
				body: units.ammonite.default,
			},
		},
	},
	{
		name: "proxy",
		path: "/y",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { gauze, model } = services;
			const proxyJWT = gauze.default.getProxyJWT();
			if (proxyJWT) {
				// check expiration
				const now = new Date().getTime() / 1000;
				const decoded = jose.decodeJwt(proxyJWT);
				if (now < decoded.exp) {
					// valid
					return Promise.resolve(true);
				} else {
					// invalid
					gauze.default.deleteProxyJWT();
					return Promise.reject({ redirect: { name: "environment.signin" } });
				}
			} else {
				return Promise.reject({ redirect: { name: "environment.signin" } });
			}
		},
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "proxy.agents",
		path: "/agents?next",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { gauze, model } = services;
			const proxyJWT = gauze.default.getProxyJWT();
			if (proxyJWT) {
				const now = new Date().getTime() / 1000;
				const decoded = jose.decodeJwt(proxyJWT);
				if (now < decoded.exp) {
					const agentProxies = model.default.all("PROXY").filter(function (proxy) {
						return proxy.gauze__proxy__root_id === decoded.proxy_id;
					});
					if (agentProxies && agentProxies.length === 5) {
						return Promise.resolve(true);
					} else {
						const proxy = {
							gauze__proxy__root_id: decoded.proxy_id
						};
						return gauze.default.proxies(proxy).then(function (proxies) {
							proxies.forEach(function (proxy) {
								model.default.create(proxy._metadata.type, proxy._metadata.id, proxy.attributes);
							});
							return Promise.resolve(true);
						});
					}
				} else {
					gauze.default.deleteProxyJWT();
					return Promise.reject({ redirect: { name: "environment.signin", params: { next: toStart.params.next } } });
				}
			} else {
				return Promise.reject({ redirect: { name: "environment.signin", params: { next: toStart.params.next } } });
			}
		},
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alpaca.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner3.default,
			},
			bottom: {
				body: units.proxies.default,
			},
		},
	},
	{
		name: "system",
		path: "/x",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { gauze, model } = services;
			const systemJWT = gauze.default.getSystemJWT();
			const proxyJWT = gauze.default.getProxyJWT();
			if (systemJWT) {
				// check expiration
				const now = new Date().getTime() / 1000;
				const decodedSystem = jose.decodeJwt(systemJWT);
				if (now < decodedSystem.exp) {
					// valid
					// load headers if necessary
					if (model.default.all("HEADER").length) {
						setTimeout(function () {
							console.log("async header");
							return gauze.default.header().then(function (headers) {
								headers.forEach(function (header) {
									model.default.create("HEADER", header.name, header);
								});
							});
						}, 0);
						return Promise.resolve(true);
					} else {
						return gauze.default.header().then(function (headers) {
							headers.forEach(function (header) {
								model.default.create("HEADER", header.name, header);
							});
						});
					}
				} else {
					gauze.default.deleteSystemJWT();
					// invalid
					if (proxyJWT) {
						const decodedProxy = jose.decodeJwt(proxyJWT);
						if (now < decodedProxy.exp) {
							return Promise.reject({ redirect: { name: "proxy.agents" }, params: { next: window.location.href } });
						} else {
							gauze.default.deleteProxyJWT();
							return Promise.reject({ redirect: { name: "environment.signin", params: { next: window.location.href } } });
						}
					} else {
						return Promise.reject({ redirect: { name: "environment.signin", params: { next: window.location.href } } });
					}
				}
			} else {
				if (proxyJWT) {
					const decodedProxy = jose.decodeJwt(proxyJWT);
					if (now < decodedProxy.exp) {
						return Promise.reject({ redirect: { name: "proxy.agents" }, params: { next: window.location.href } });
					} else {
						gauze.default.deleteProxyJWT();
						return Promise.reject({ redirect: { name: "environment.signin", params: { next: window.location.href } } });
					}
				} else {
					return Promise.reject({ redirect: { name: "environment.signin", params: { next: window.location.href } } });
				}
			}
		},
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.alder.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.adamite.default,
			},
			right: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.graph",
		path: "/graph",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			return true;
		},
		layout: layouts.albatross.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner2.default,
			},
			bottom: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.graph.space",
		path: "/:space?time",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { gauze, model, graph, router } = services;
			const orchestrateServices = {
				gauze: gauze.default,
				model: model.default,
				graph: graph.default,
				router: router.default,
			};
			const spaceID = toState.params.space;
			const agentHeader = gauze.default.getSystemAgentHeader(model.default);
			const space = graph.default.readSpace(agentHeader.name, spaceID);
			if (space) {
				// reload space
				// return orchestrate.reloadSpace(orchestrateServices, agentHeader, toState.params.space)
				setTimeout(function () {
					console.log("async reload space");
					return orchestrate.reloadSpace(orchestrateServices, agentHeader, spaceID);
				}, 0);
				return true;
			} else {
				// create space
				// create root node
				// reload space
				return orchestrate.createSpace(orchestrateServices, agentHeader, spaceID).then(function (space) {
					return orchestrate.reloadSpace(orchestrateServices, agentHeader, spaceID);
				});
			}
		},
		layout: layouts.albatross.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.banner2.default,
			},
			bottom: {
				body: units.space.default,
			},
		},
	},
	{
		name: "system.types",
		path: "/types",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			return true;
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				header: units.adamite.default,
				body: units.header.default,
			},
			right: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.types.list",
		path: "/list",
		onActivate: function ({ dependencies, toState }) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.header.default,
				header: units.adamite.default,
			},
			right: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.types.list.type",
		path: "/:type?where&limit&offset&order&order_direction&fields",
		onActivate: function ({ dependencies, toState }) {
			const { services } = dependencies;
			const { gauze, model, router } = services;
			const header = model.default.read("HEADER", toState.params.type);
			const transactions = [
				function () {
					return gauze.default
						.read(header, {
							where: toState.params.where ? JSON.parse(decodeURIComponent(toState.params.where)) : {},
							limit: toState.params.limit ? Number.parseInt(toState.params.limit) : PAGINATION_PAGE_SIZE,
							offset: toState.params.offset ? Number.parseInt(toState.params.offset) : 0,
							order: toState.params.order,
							order_direction: toState.params.order_direction,
						})
						.then(function (items) {
							items.forEach(function (item) {
								model.default.create(header.graphql_meta_type, item.attributes[header.primary_key], item.attributes);
							});
							const ids = items.map(function (item) {
								return item.attributes[header.primary_key];
							});
							// create a pagination record for the results tied to the route/query
							const pagination_key = router.default.buildUrl(toState.name, toState.params);
							model.default.create("PAGINATION_SET", pagination_key, ids);
							return Promise.resolve(true);
						})
						.catch(function (err) {
							console.error(err);
							// todo: figure out control flow for failed calls
						});
				},
				function () {
					return gauze.default
						.count(header, {
							count: {
								[header.primary_key]: header.primary_key,
							},
							where: toState.params.where ? JSON.parse(decodeURIComponent(toState.params.where)) : {},
						})
						.then(function (counts) {
							// store these results for this query/url
							const pagination_key = router.default.buildUrl(toState.name, toState.params);
							model.default.create("PAGINATION_COUNT", pagination_key, counts);
							return Promise.resolve(true);
						})
						.catch(function (err) {
							console.error(err);
							// todo: figure out control flow for failed calls
						});
				},
			];
			return Promise.all(
				transactions.map(function (f) {
					return f();
				}),
			);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.header.default,
				header: units.adamite.default,
			},
			right: {
				//header: units.header.default,
				body: units.typeList.default,
			},
		},
	},
	{
		name: "system.types.item",
		path: "/item",
		onActivate: function ({ dependencies, toState }) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.header.default,
				header: units.adamite.default,
			},
			right: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.types.item.type",
		path: "/:type",
		onActivate: function ({ dependencies, toState }) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.header.default,
				header: units.adamite.default,
			},
			right: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system.types.item.type.id",
		path: "/:id?mode&fields",
		onActivate: function ({ dependencies, toState }) {
			const { services } = dependencies;
			const { gauze, model, router } = services;
			const header = model.default.read("HEADER", toState.params.type);
			return gauze.default
				.read(header, {
					where: {
						[header.primary_key]: toState.params.id,
					},
				})
				.then(function (items) {
					items.forEach(function (item) {
						model.default.create(header.graphql_meta_type, item.attributes[header.primary_key], item.attributes);
					});
					return Promise.resolve(true);
				})
				.catch(function (err) {
					console.log(err);
					// throw?
				});
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.header.default,
				header: units.adamite.default,
			},
			right: {
				body: units.typeItem.default,
			},
		},
	},
	{
		name: "design",
		path: "/design",
		layout: layouts.axolotl.default,
		sections: {},
		units: {},
	},
];

export default routes;
