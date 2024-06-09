import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({ agentHeader, route, dataX, dataY, graph, nodes, edges, connections, node, connection, gauze, model, router, buttonClass, buttonSpanClass, spanClass }) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		if (node.render && node.initialized && (connection.x === null || connection.y === null)) {
			const containerRects = containerRef.current.getClientRects()[0];
			const initialized = {
				...connection,
				height: containerRef.current.offsetHeight,
				width: containerRef.current.offsetWidth,
				x: containerRects.x,
				y: containerRects.y,
				z: 1,
			};
			graph.initializeConnections([initialized]);
		}
	});
	return (
		<div ref={containerRef} className="connection" data-id={connection.id} data-x={connection.x} data-y={connection.y}>
			<connection.component
				agentHeader={agentHeader}
				route={route}
				nodes={nodes}
				edges={edges}
				connections={connections}
				node={node}
				connection={connection}
				buttonClass={buttonClass}
				buttonSpanClass={buttonSpanClass}
				spanClass={spanClass}
				{...connection.props}
			/>
		</div>
	);
}
