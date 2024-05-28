import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({
	route,
	render,
	dataX,
	dataY,
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
	node,
	connection,
	gauze,
	model,
	router,
}) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		if (connection.x === null || connection.y === null) {
			render.unsubscribe(route.name, "CONNECTION", connection.id, connection.id);
			render.subscribe(route.name, "CONNECTION", connection.id, connection.id, function (data) {
				setTimeout(function () {
					if (!containerRef || !containerRef.current) {
						console.log("missing", connections[connection.id].entityID, connections[connection.id].entityType, connection.name);
					}
					const containerRects = containerRef.current.getClientRects()[0];
					const initialized = {
						...connection,
						height: containerRef.current.offsetHeight,
						width: containerRef.current.offsetWidth,
						x: containerRects.x,
						y: containerRects.y,
					};
					initializeConnections([initialized]);
					render.unsubscribe(route.name, "CONNECTION", connection.id, connection.id);
				}, 0);
			});
		}
	});
	/*<div ref={containerRef} className="absolute top-0 pa1" style={{"visibility": "hidden"}}>*/
	return (
		<div ref={containerRef} className="connection" data-id={connection.id} data-x={connection.x} data-y={connection.y}>
			<connection.component
				route={route}
				render={render}
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
				node={node}
				connection={connection}
				{...connection.props}
			/>
		</div>
	);
}
