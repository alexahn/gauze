import React from "react";
import { useState } from "react";

export default function Edge({ agentHeader, route, graph, nodes, edges, connections, edge, gauze, model, router }) {
	// todo: replace xmlns with a real address
	const from = connections[edge.fromConnectionID];
	const fromXY = from.x !== null && from.y !== null && !isNaN(from.x) && !isNaN(from.y);
	const to = connections[edge.toConnectionID];
	const toXY = to.x !== null && to.y !== null && !isNaN(to.x) && !isNaN(to.y);
	//console.log('edge', edge.id, fromX, fromY, toX, toY)
	// todo: change the stroke width to be the z value from a connection later (for now it is useful to see the lines converge to the center)
	if (from && to && fromXY && toXY) {
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
