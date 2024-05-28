import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({
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
	node,
	connection,
	gauze,
	model,
	router,
}) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		//console.log('connection', connection)
		if (node.height === null || node.width === null) {
			render.unsubscribe(route.name, "NODE", node.id, connection.id);
			render.subscribe(route.name, "NODE", node.id, connection.id, function (data) {
				setTimeout(function () {
					const containerRects = containerRef.current.getClientRects()[0];
					const initialized = {
						...connection,
						height: containerRef.current.offsetHeight,
						width: containerRef.current.offsetWidth,
						x: containerRects.x,
						y: containerRects.y,
					};
					initializeConnections([initialized]);
					render.unsubscribe(route.name, "NODE", node.id, connection.id);
				}, 0);
			});
		}
		//console.log("connection", containerRef.current.getClientRects()[0]);
	});
	/*<div ref={containerRef} className="absolute top-0 pa1" style={{"visibility": "hidden"}}>*/
	return (
		<div ref={containerRef} className="">
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
