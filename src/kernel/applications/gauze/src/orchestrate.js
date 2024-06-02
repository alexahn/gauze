// this file holds functions that act as high level actions/methods that work across multiple services

import { PAGINATION_PAGE_SIZE } from "./constants.js";

import { v4 as uuidv4 } from "uuid";

function createNode(services, header) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		graph.createNodes([
			{
				id: uuidv4(),
				root: true,
				index: 0,
				oldX: 0,
				oldY: 0,
				x: 0,
				y: 0,
				z: 1,
				height: null,
				width: null,
				component: table.default,
				props: {
					gauze: gauze,
					model: model,
					router: router,
					graph: graph,
					type: header.name,
					table_name: header.table_name,
					primary_key: header.primary_key,
					graphql_meta_type: header.graphql_meta_type,
					fromNodeID: null,
					toNodeID: null,
					from: null,
					to: null,
					fields: header.fields,
					variables: {
						where: {},
						offset: 0,
						limit: PAGINATION_PAGE_SIZE,
						order: header.default_order,
						order_direction: "desc",
					},
					data: [],
					count: 0,
				},
				complete: false,
				sound: false,
				render: false,
			},
		]);
	});
}

function read(services, header, variables) {
	const { gauze, model } = services;
	const transactions = [
		function () {
			return gauze.read(header, variables).then(function (data) {
				data.forEach(function (item) {
					model.create(item._metadata.type, item._metadata.id, item.attributes);
				});
				return data;
			});
		},
		function () {
			const countVariables = {
				source: variables.source,
				count: {
					[header.primary_key]: header.primary_key,
				},
				where: variables.where,
			};
			return gauze.count(header, countVariables);
		},
	];
	return Promise.all(
		transactions.map(function (f) {
			return f();
		}),
	);
}

function synchronize(services, agentHeader, targetNode, callback) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		if (targetNode) {
			const synced = graph.syncNodeEdges(targetNode, targetNode.props.data);
			console.log("synced", synced);
			// create new edges, connections, and nodes using service
			const newConnections = synced.newConnections.map(function (connection) {
				return {
					...connection,
					component: relationship.default,
					props: {
						gauze: gauze,
						model: model,
						router: router,
					},
				};
			});
			const newEdges = synced.newEdges;
			graph.createConnections(newConnections);
			graph.createEdges(newEdges);
			callback(targetNode);
		}
		// syncedConnections is the total set of connections for all nodes
		const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
		// wipe connections for all active nodes
		graph.updateNodes(
			graph.activeNodes(agentHeader.name).values.map(function (node) {
				return {
					...node,
					props: {
						...node.props,
						connectionIDs: [],
					},
				};
			}),
		);
		// apply synced connections for all nodes
		const connectedNodes = Object.keys(syncedConnections).map(function (id) {
			return {
				...graph.selectNode(id),
				props: {
					...graph.selectNode(id).props,
					connectionIDs: syncedConnections[id].connections,
				},
			};
		});
		graph.updateNodes(connectedNodes);
		// reinitialize nodes
		graph.updateNodes(
			graph.activeNodes(agentHeader.name).values.map(function (node) {
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
		graph.updateConnections(
			graph.activeConnections(agentHeader.name).values.map(function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
	});
}

function traverse(services, agentHeader, targetHeader, targetNode) {
	const { gauze, model, graph } = services;
	return read(
		{
			gauze,
			model,
		},
		targetHeader,
		targetNode.props.variables,
	).then(function (results) {
		const data = results[0].map(function (item) {
			return item.attributes;
		});
		const count = results[1][0].count;
		targetNode.props.data = data;
		targetNode.props.count = count;
		synchronize(services, agentHeader, targetNode, function (targetNode) {
			graph.createNodes([targetNode]);
		});
	});
}

function traverseTo(services, agentHeader, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverseTo", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "to",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: source,
				fromNodeID: node.id,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function traverseFrom(services, agentHeader, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "from",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: source,
				toNodeID: node.id,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function traverseRoot(services, agentHeader, where, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", where, targetType);
		console.log("targetHeader", targetHeader);
		const targetNode = {
			id: uuidv4(),
			workspace: agentHeader.name,
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					where: where,
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function reload(services, agentHeader) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		const activeNodes = graph.activeNodes(agentHeader.name);
		return Promise.all(
			activeNodes.values.map(function (node) {
				const header = model.read("HEADER", node.props.type);
				const transactions = [
					function () {
						return gauze.read(header, node.props.variables).then(function (data) {
							if (data && data.length) {
								data.forEach(function (item) {
									model.create(item._metadata.type, item._metadata.id, item.attributes);
								});
							}
							return data;
						});
					},
					function () {
						return gauze.count(header, {
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
		).then(function (results) {
			// update data and count
			graph.updateNodes(
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
			const synced = graph.syncNodesEdges(results);
			console.log("reload synced", synced);
			const newConnections = synced.newConnections.map(function (connection) {
				return {
					...connection,
					component: relationship.default,
					props: {
						gauze: gauze,
						model: model,
						router: router,
						graph: graph,
					},
				};
			});
			const newEdges = synced.newEdges;
			graph.createConnections(newConnections);
			graph.createEdges(newEdges);
			const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
			console.log("reload syncedConnections", syncedConnections);
			const connectedNodes = Object.keys(syncedConnections).map(function (id) {
				return {
					...graph.nodes[id],
					props: {
						...graph.nodes[id].props,
						connectionIDs: syncedConnections[id].connections,
					},
				};
			});
			graph.updateNodes(connectedNodes);
			// reinitialize
			graph.updateNodes(
				graph.activeNodes(agentHeader.name).values.map(function (node) {
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
			graph.updateConnections(
				graph.activeConnections(agentHeader.name).values.map(function (connection) {
					return {
						...connection,
						x: null,
						y: null,
					};
				}),
			);
			return results;
		});
	});
}

function createRelationship(services, agentHeader, relationship) {
	return import("./components/Relationship.jsx").then(function (component) {
		const { gauze, model, router, graph } = services;
		const activeEdges = graph.activeEdges(agentHeader.name);
		const activeConnections = graph.activeConnections(agentHeader.name);
		const edge = activeEdges.values.find(function (edge) {
			const fromConnection = activeConnections.object[edge.fromConnectionID];
			const toConnection = activeConnections.object[edge.toConnectionID];
			const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
			const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
			const toEntityID = toConnection.entityID === relationship.toEntityID;
			const toEntityType = toConnection.entityType === relationship.toEntityType;
			return fromEntityID && fromEntityType && toEntityID && toEntityType;
		});
		if (edge) {
			console.log("edge", edge);
		} else {
			alert(JSON.stringify(relationship, null, 4));
			const headers = model.all("HEADER")
			const relationshipHeader = headers.find(function (header) {
				return header.name === 'relationship'
			})
			console.log('relationshipHeader', relationshipHeader)
			const attributes = {
				gauze__relationship__from_id: relationship.fromEntityID,
				gauze__relationship__from_type: relationship.fromEntityType,
				gauze__relationship__to_id: relationship.toEntityID,
				gauze__relationship__to_type: relationship.toEntityType
			}
			return gauze.create(relationshipHeader, {
				attributes: attributes
			}).then(function (data) {
				console.log("RELATIONSHIP CREATED", data)
			})
			// create a relationship, create the connections, create the edge
		}
	});
}

export { createNode, read, reload, synchronize, traverse, traverseTo, traverseFrom, traverseRoot, createRelationship };
