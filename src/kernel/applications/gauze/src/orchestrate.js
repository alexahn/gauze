// this file holds functions that act as high level actions/methods that work across multiple services

import { PAGINATION_PAGE_SIZE } from "./constants.js";

import { v4 as uuidv4 } from "uuid";

function synchronize(services, targetNode, callback) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services
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
	})
}

function traverse(services, targetHeader, targetNode) {
	const { gauze, model } = services
	return read(gauze, model, targetHeader, targetNode.props.variables)
		.then(function (results) {
			const data = results[0].map(function (item) {
				return item.attributes;
			});
			const count = results[1][0].count;
			targetNode.props.data = data;
			targetNode.props.count = count;
			synchronize(services, targetNode, function (targetNode) {
				graph.createNodes([targetNode]);
			});
		})
}

function traverseTo(services, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type)
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
		return traverse(services, targetHeader, targetNode);
	}
}

function traverseFrom(services, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type)
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
		return traverse(services, targetHeader, targetNode);
	})
};

function traverseRoot(services, where, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type)
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
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
		return traverse(services, targetHeader, targetNode);
	})
};

export {
	synchronize,
	traverse,
	traverseTo,
	traverseFrom,
	traverseRoot
}
