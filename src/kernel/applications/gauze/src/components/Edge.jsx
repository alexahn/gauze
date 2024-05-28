import React from "react";
import { useState } from "react";

export default function Edge({
	route,
	render,
	nodes,
	initializeNodes,
	createNodes,
	readNodes,
	updateNodes,
	deleteNodes,
	edges,
	createEdges,
	readEdges,
	updateEdges,
	deleteEdges,
	connections,
	initializeConnections,
	createConnections,
	readConnections,
	updateConnections,
	deleteConnections,
	edge,
	gauze,
	model,
	router,
}) {
	// todo: replace xmlns with a real address
	const from = connections[edge.fromConnectionID];
	const to = connections[edge.toConnectionID];
	//console.log('edge', edge.id, fromX, fromY, toX, toY)
	// todo: change the stroke width to be the z value from a connection later (for now it is useful to see the lines converge to the center)
	if (from && to) {
		return (
			<div style={{ zIndex: -1 }} className="relative top-0 left-0">
				<svg className="absolute top-0 left-0" viewBox={`0 0 ${window.screen.width} ${window.screen.height}`} xmlns="http://www.w3.org/2000/svg">
					<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="black" strokeWidth={1} />
				</svg>
			</div>
		);
	} else {
		return null;
	}
}
