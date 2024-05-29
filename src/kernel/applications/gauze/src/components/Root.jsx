import React from "react";
import { useState, useEffect } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

export default function Root({ gauze, model, router, route, render, graph }) {
	const agentHeader = gauze.getSystemAgentHeader(model);
	const activeNodes = graph.activeNodes(agentHeader.name, graph.nodes, graph.edges, graph.connections);
	//const activeNodesArray = graph.activeNodesArray(agentHeader.name, graph.nodes, graph.edges, graph.connections)
	const activeEdges = graph.activeEdges(graph.nodes, graph.edges, graph.connections);
	//const activeEdgesArray = graph.activeEdgesArray(activeNodes, graph.edges, graph.connections)
	const activeConnections = graph.activeConnections(graph.nodes, graph.edges, graph.connections);
	//const activeConnectionsArray = graph.activeConnectionsArray(activeNodes, activeEdges, graph.connections)
	const [nodes, setNodes] = useState(activeNodes);
	const [edges, setEdges] = useState(activeEdges);
	const [connections, setConnections] = useState(activeConnections);

	useEffect(function () {
		const timer = setInterval(function () {
			const activeNodes = graph.activeNodes(agentHeader.name, graph.nodes, graph.edges, graph.connections);
			const activeConnections = graph.activeConnections(graph.nodes, graph.edges, graph.connections);
			const activeEdges = graph.activeEdges(graph.nodes, graph.edges, graph.connections);
			setNodes(activeNodes);
			setConnections(activeConnections);
			setEdges(activeEdges);
		}, 128);
		return function () {
			clearInterval(timer);
		};
	});
	return (
		<Graph
			key={"graph"}
			agentHeader={agentHeader}
			route={route}
			graph={graph}
			activeNodes={activeNodes}
			activeEdges={activeEdges}
			activeConnections={activeConnections}
			nodes={nodes}
			edges={edges}
			connections={connections}
		/>
	);
}
