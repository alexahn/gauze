import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({ agentHeader, route, dataX, dataY, graph, nodeID, connectionID, gauze, model, router, buttonClass, buttonSpanClass, spanClass }) {
	const containerRef = useRef();
	const node = graph.selectNode(nodeID);
	const connection = graph.selectConnection(connectionID);
	useLayoutEffect(function () {
		// note: we need to do something about this render guard here
		if (node.render && (connection.x === null || connection.y === null)) {
			const containerRects = containerRef.current.getClientRects()[0];
			const initialized = {
				...connection,
				height: containerRef.current.offsetHeight,
				width: containerRef.current.offsetWidth,
				x: containerRects.x,
				y: containerRects.y,
			};
			graph.initializeConnections([initialized]);
		}
	});
	return (
		<div ref={containerRef} className="connection" data-id={connection && connection.id} data-x={connection && connection.x} data-y={connection && connection.y}>
			<connection.component
				agentHeader={agentHeader}
				route={route}
				nodeID={nodeID}
				connectionID={connectionID}
				buttonClass={buttonClass}
				buttonSpanClass={buttonSpanClass}
				spanClass={spanClass}
				{...connection.props}
			/>
		</div>
	);
}
