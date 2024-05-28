import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

export default function Root({ gauze, model, router, route, render, graph }) {
	// todo: either use the model service to have an equivalent of the PAGINATION type entry to select the accessable nodes or filter the nodes here based on the root
	// todo: could have a GRAPH type entry in model that holds an array of node ids (we would need to initialize it in the route just like we do for PAGINATION)
	const [nodes, setNodes] = useState(graph.nodes);
	const [edges, setEdges] = useState(graph.edges);
	const [connections, setConnections] = useState(graph.connections);

	// todo: split this function so that we only change coordinates for new components
	// todo: we want to differentiate between loading from pre-existing coordinates to finding a place for a new component (otherwise the padding will cause a drift on every load)
	function initializeNodes(candidates) {
		const staged = { ...nodes };
		const nodesArray = Object.values(staged);
		candidates.forEach(function (node) {
			const { width, height } = node;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			if (node.render) {
				staged[node.id] = node;
			} else {
				// get max x in nodes
				// get max y in nodes
				const zMax = nodesArray.reduce(function (max, item) {
					const candidate = item.z;
					if (item.root === true && max <= candidate) {
						return candidate;
					} else if (item.render && max <= candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const xMax = nodesArray.reduce(function (max, item) {
					const candidate = item.x + item.width * item.z;
					if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const yMax = nodesArray.reduce(function (max, item) {
					const candidate = item.y + item.height * item.z;
					if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const padding = 10;
				const x = xMax + padding * zMax;
				const y = yMax + padding * zMax;
				const z = zMax;
				staged[node.id] = {
					...node,
					x,
					y,
					z,
					render: true,
				};
			}
		});
		setNodes(staged);
	}
	// node methods
	function readNodes(candidates) {
		return candidates.map(function (node) {
			return nodes[node.id];
		});
	}
	function createNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		setNodes(staging);
	}
	function updateNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		setNodes(staging);
	}
	function deleteNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			delete staging[node.id];
		});
		setNodes(staging);
	}
	// edge methods
	function readEdges(candidates) {
		return candidates.map(function (edge) {
			return edges[edge.id];
		});
	}
	function createEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		setEdges(staging);
	}
	function updateEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		setEdges(staging);
	}
	function deleteEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			delete staging[edge.id];
		});
		setEdges(staging);
	}
	// connection methods
	function initializeConnections(candidates) {
		const staged = { ...connections };
		const connectionsArray = Object.values(staged);
		candidates.forEach(function (connection) {
			const { width, height } = connection;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			staged[connection.id] = connection;
		});
		setConnections(staged);
	}
	function readConnections(candidates) {
		return candidates.map(function (connection) {
			return connections[connection.id];
		});
	}
	function createConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		setConnections(staging);
	}
	function updateConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		setConnections(staging);
	}
	function deleteConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			delete staging[connection.id];
		});
		setConnections(staging);
	}

	const initializeNode = Object.values(nodes).find(function (node) {
		return node.complete && node.width === null && node.height === null;
	});
	if (initializeNode) {
		setTimeout(function () {
			render.create(route.name, "NODE", initializeNode.id, true);
		}, 0);
	}
	const initializeConnection = Object.values(connections).find(function (connection) {
		return connection.x === null && connection.y === null;
	});
	if (!initializeNode && initializeConnection) {
		setTimeout(function () {
			render.create(route.name, "CONNECTION", initializeConnection.id, true);
		}, 0);
	}
	// todo: useEffect to set up a setInterval to sync with service
	return (
		<Graph
			key={"graph"}
			route={route}
			render={render}
			graph={graph}
			nodes={nodes}
			initializeNodes={initializeNodes}
			createNodes={createNodes}
			readNodes={readNodes}
			updateNodes={updateNodes}
			deleteNodes={deleteNodes}
			edges={edges}
			createEdges={createEdges}
			readEdges={readEdges}
			updateEdges={updateEdges}
			deleteEdges={deleteEdges}
			connections={connections}
			initializeConnections={initializeConnections}
			createConnections={createConnections}
			readConnections={readConnections}
			updateConnections={updateConnections}
			deleteConnections={deleteConnections}
		/>
	);
}
