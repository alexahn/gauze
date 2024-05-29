import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({ route, dataX, dataY, graph, nodes, edges, connections, node, connection, gauze, model, router }) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		if (node.render && (connection.x === null || connection.y === null)) {
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
	/*<div ref={containerRef} className="absolute top-0 pa1" style={{"visibility": "hidden"}}>*/
	return (
		<div ref={containerRef} className="connection" data-id={connection.id} data-x={connection.x} data-y={connection.y}>
			<connection.component route={route} nodes={nodes} edges={edges} connections={connections} node={node} connection={connection} {...connection.props} />
		</div>
	);
}
