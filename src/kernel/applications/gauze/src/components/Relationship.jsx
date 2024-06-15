import React from "react";
import { useState } from "react";

function absoluteToAbstract({ x, y, z, width, height }) {
	return {
		/*
        x: z > 1 ? x - (1 - z) * (width / 2) : x + (1 - z) * (width / 2),
        y: z > 1 ? y - (1 - z) * (height / 2) : y + (1 - z) * (height / 2),
		*/
		x: x + (1 - z) * (width / 2),
		y: y + (1 - z) * (height / 2),
		z: z,
	};
}

export default function Relationship({ agentHeader, route, nodeID, connectionID, buttonClass, buttonSpanClass, spanClass, gauze, model, router, graph }) {
	const spaceID = route.params.space;
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const edge = activeEdges.values.find(function (edge) {
		return edge.fromConnectionID === connectionID || edge.toConnectionID === connectionID;
	});
	function handleFocus(connection) {
		// simple hack using window width and height (will need to use the containing dimensions later if we ever want to embed the graph)
		return function (e) {
			const activeNodes = graph.activeNodes(agentHeader.name);
			const activeConnections = graph.activeConnections(agentHeader.name);
			const node = activeNodes.object[connection.nodeID];
			/*
			const abstractWindow = absoluteToAbstract({
				x: document.documentElement.clientWidth / 2,
				y: document.documentElement.clientHeight / 2,
				z: node.z,
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			})
			*/
			const abstractWindow = absoluteToAbstract({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				z: node.z,
				width: window.innerWidth,
				height: window.innerHeight,
			});
			const offsetX = abstractWindow.x * node.z - node.x - (node.width / 2) * node.z;
			const offsetY = abstractWindow.y * node.z - node.y - (node.height / 2) * node.z;
			graph.updateConnections(
				activeConnections.values.map(function (connection) {
					return {
						...connection,
						x: connection.x + offsetX,
						y: connection.y + offsetY,
					};
				}),
			);
			graph.updateNodes(
				activeNodes.values.map(function (node) {
					return {
						...node,
						x: node.x + offsetX,
						y: node.y + offsetY,
					};
				}),
			);
		};
	}
	if (edge) {
		if (edge.fromConnectionID === connectionID) {
			const toConnection = graph.selectConnection(edge.toConnectionID);
			return (
				<div className="relative row" tabIndex="0">
					<button className={buttonClass}>
						<div className="w3 truncate-ns">{toConnection.entityID}</div>
					</button>
					<span className={spanClass} style={{ zIndex: 4 }}>
						<div>{toConnection.entityID}</div>
						<div>
							<button className={buttonSpanClass} onClick={handleFocus(toConnection)}>
								Focus
							</button>
						</div>
					</span>
				</div>
			);
		} else if (edge.toConnectionID === connectionID) {
			const fromConnection = graph.selectConnection(edge.fromConnectionID);
			return (
				<div className="relative row" tabIndex="0">
					<button className={buttonClass}>
						<div className="w3 truncate-ns">{fromConnection.entityID}</div>
					</button>
					<span className={spanClass} style={{ zIndex: 4 }}>
						<div>{fromConnection.entityID}</div>
						<div>
							<button className={buttonSpanClass} onClick={handleFocus(fromConnection)}>
								Focus
							</button>
						</div>
					</span>
				</div>
			);
		}
	} else {
		return <div className="w3 truncate-ns">Relationship</div>;
	}
}
