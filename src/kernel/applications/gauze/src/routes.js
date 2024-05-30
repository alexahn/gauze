import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

import { PAGINATION_PAGE_SIZE } from "./constants.js";

import * as components from "./components/index.js";

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
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				header: units.adamite.default,
				body: units.ammonite.default,
			},
			right: {
				body: units.azurite.default,
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
				const decoded = jose.decodeJwt(proxyJWT);
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
		layout: layouts.anaconda.default,
		sections: {
			left: sections.almond.default,
			right: sections.alder.default,
		},
		units: {
			left: {
				header: units.adamite.default,
				body: units.proxies.default,
			},
			right: {
				body: units.azurite.default,
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
		name: "system.root",
		path: "/root",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { gauze, model, graph, router } = services;
			return gauze.default.header().then(function (headers) {
				headers.forEach(function (header) {
					model.default.create("HEADER", header.name, header);
				});
				const agentHeader = gauze.default.getSystemAgentHeader(model.default);
				const root = graph.default.root(agentHeader.name);
				if (root) {
					console.log("root found!");
				} else {
					const rootID = uuidv4();
					graph.default.createNodes([
						{
							id: rootID,
							root: true,
							index: 0,
							oldX: 0,
							oldY: 0,
							x: 0,
							y: 0,
							z: 1,
							height: null,
							width: null,
							component: components.table.default,
							props: {
								gauze: gauze.default,
								model: model.default,
								router: router.default,
								graph: graph.default,
								type: agentHeader.name,
								table_name: agentHeader.table_name,
								primary_key: agentHeader.primary_key,
								graphql_meta_type: agentHeader.graphql_meta_type,
								fromNodeID: null,
								toNodeID: null,
								from: null,
								to: null,
								fields: agentHeader.fields,
								variables: {
									where: {},
									limit: PAGINATION_PAGE_SIZE,
								},
								data: [],
								count: 0,
							},
							complete: false,
							sound: false,
							render: false,
						},
					]);
				}
				// note: load from local storage in the future
				// note: parse all nodes, and stitch together one graphql query
				// note: refresh the data section for all nodes on load
				// note: we don't need to wait until the query is done to present data, because we can present the data from local storage
				// note: there are four main states for nodes:
				// note:    incomplete (we don't have all the fields associated with the identifer)
				// note:    complete (we have all the fields associated with the identifier)
				// note:    unsound (the fields we have are not the latest values)
				// note:    sound (the fields we have are the latest values)
				// note: we can only proceed with rendering once every node is complete
				// note: we can proceed with soundness after rendering
				//const activeNodesArray = graph.default.activeNodesArray(agentHeader.name, graph.default.nodes, graph.default.edges, graph.default.connections);
				const activeNodes = graph.default.activeNodes(agentHeader.name);
				return Promise.all(
					activeNodes.values.map(function (node) {
						const header = model.default.read("HEADER", node.props.type);
						const transactions = [
							function () {
								return gauze.default.read(header, node.props.variables).then(function (data) {
									if (data && data.length) {
										data.forEach(function (item) {
											model.default.create(item._metadata.type, item._metadata.id, item.attributes);
										});
									}
									return data;
								});
							},
							function () {
								return gauze.default.count(header, {
									source: node.props.variables.source,
									count: {
										[header.primary_key]: header.primary_key,
									},
									where: node.props.variables.where,
								});
							},
						];
						return Promise.all(
							transactions.map(function (t) {
								return t();
							}),
						).then(function (results) {
							const data = results[0].map(function (item) {
								return item.attributes;
							});
							const count = results[1][0].count;
							return {
								node: node,
								header: header,
								data: data,
								count: count,
							};
						});
					}),
				)
					.then(function (results) {
						// update data and count
						graph.default.updateNodes(
							results.map(function (result) {
								return {
									...result.node,
									props: {
										...result.node.props,
										data: result.data,
										count: result.count,
										connectionIDs: [],
									},
									complete: true,
								};
							}),
						);
						const synced = graph.default.syncNodesEdges(results);
						console.log("route synced", synced);
						const newConnections = synced.newConnections.map(function (connection) {
							return {
								...connection,
								component: components.relationship.default,
								props: {
									gauze: gauze.default,
									model: model.default,
									router: router.default,
									graph: graph.default,
								},
							};
						});
						const newEdges = synced.newEdges;
						graph.default.createConnections(newConnections);
						graph.default.createEdges(newEdges);
						const syncedConnections = graph.default.syncNodeConnections(graph.default.nodes, graph.default.edges, graph.default.connections);
						console.log("route syncedConnections", syncedConnections);
						const connectedNodes = Object.keys(syncedConnections).map(function (id) {
							return {
								...graph.default.nodes[id],
								props: {
									...graph.default.nodes[id].props,
									connectionIDs: syncedConnections[id].connections,
								},
							};
						});
						graph.default.updateNodes(connectedNodes);
						// reinitialize
						graph.default.updateNodes(
							graph.default.activeNodes(agentHeader.name).values.map(function (node) {
								return {
									...node,
									oldWidth: node.width,
									oldHeight: node.height,
									width: null,
									height: null,
								};
							}),
						);
						// reinitialize connections
						graph.default.updateConnections(
							graph.default.activeConnections(agentHeader.name).values.map(function (connection) {
								return {
									...connection,
									x: null,
									y: null,
								};
							}),
						);
						return results;
					})
					.catch(function (err) {
						console.error(err);
						throw err;
					});
			});
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
				body: units.root.default,
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
];

export default routes;
