import React from "react";
import { useState } from "react";

export default function Relationship({ agentHeader, route, nodes, connections, edges, node, connection, gauze, model, router, graph }) {
	const activeEdges = graph.activeEdges(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const edge = activeEdges.values.find(function (edge) {
		return edge.fromConnectionID === connection.id || edge.toConnectionID === connection.id;
	});
	if (edge) {
		if (edge.fromConnectionID === connection.id) {
			const toConnection = activeConnections.object[edge.toConnectionID];
			return <div className="w3 truncate-ns">{toConnection.entityID}</div>;
		} else if (edge.toConnectionID === connection.id) {
			const fromConnection = activeConnections.object[edge.fromConnectionID];
			return <div className="w3 truncate-ns">{fromConnection.entityID}</div>;
		}
	} else {
		return <div className="w3 truncate-ns">Relationship</div>;
	}
}
