import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

import * as jose from "jose";

import { PAGINATION_PAGE_SIZE } from "./constants.js";

const routes = [
	{
		name: "environment",
		path: "/z",
		onActivate: function ({ dependencies }) {
			const { services } = dependencies;
			const { gauze, model } = services;
			const environmentSessions = model.default.environmentSessions();
			const environmentJWT = gauze.default.getEnvironmentJWT();
			if (environmentSessions && environmentSessions.length) {
				return Promise.resolve(true);
			} else if (environmentJWT) {
				return Promise.resolve(true);
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
			const proxySessions = model.default.proxySessions();
			const proxyJWT = gauze.default.getProxyJWT();
			if (proxySessions && proxySessions.length) {
				const proxy = proxySessions[0];
				return gauze.default
					.proxies({
						gauze__proxy__id: proxy.gauze__session__agent_id,
					})
					.then(function (proxies) {
						proxies.forEach(function (proxy) {
							model.default.create(proxy._metadata.type, proxy._metadata.id, proxy.attributes);
						});
						return Promise.resolve(true);
					});
			} else if (proxyJWT) {
				const decoded = jose.decodeProtectedHeader(proxyJWT);
				const proxy = {
					gauze__proxy__id: decoded.proxy_id,
				};
				return gauze.default.proxies(proxy).then(function (proxies) {
					proxies.forEach(function (proxy) {
						model.default.create(proxy._metadata.type, proxy._metadata.id, proxy.attributes);
					});
					return Promise.resolve(true);
				});
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
			const systemSessions = model.default.systemSessions();
			const systemJWT = gauze.default.getSystemJWT();
			if (systemSessions && systemSessions.length) {
				return Promise.resolve(true);
			} else if (systemJWT) {
				return Promise.resolve(true);
			} else {
				const proxySessions = model.default.proxySessions();
				if (proxySessions && proxySessions.length) {
					return Promise.reject({ redirect: { name: "proxy.agents" }, params: { next: window.location.href } });
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
		name: "system.types",
		path: "/types",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			//onActivate: function ({ dependencies }) {
			const { services } = dependencies;
			const { gauze, model } = services;
			return gauze.default.header().then(function (headers) {
				headers.forEach(function (header) {
					model.default.create("HEADER", header.name, header);
				});
				return Promise.resolve(true);
			});
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
							console.log(err);
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
		path: "/:id?mode",
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
				body: units.typeItem.default,
			},
		},
	},
];

export default routes;
