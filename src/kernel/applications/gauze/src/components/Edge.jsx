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
	const fromX = connections[edge.fromConnectionID].x;
	const fromY = connections[edge.fromConnectionID].y;
	const toX = connections[edge.toConnectionID].x;
	const toY = connections[edge.toConnectionID].y;
	//console.log('edge', edge.id, fromX, fromY, toX, toY)
	if (fromX && fromY && toX && toY) {
		return (
			<div style={{ zIndex: -1 }} className="relative top-0 left-0">
				<svg className="absolute top-0 left-0" viewBox={`0 0 ${window.screen.width} ${window.screen.height}`} xmlns="http://www.w3.org/2000/svg">
					<line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke="black" />
				</svg>
			</div>
		);
	} else {
		return null;
	}
}
