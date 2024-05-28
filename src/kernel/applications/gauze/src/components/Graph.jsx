import React, { useEffect, useRef, useState, useCallback } from "react";

import Node from "./Node.jsx";
import Edge from "./Edge.jsx";

// useRef
// refContainer.current.offsetWidth (the width of the component)
// refContainer.current.offsetHeight (the height of the component)

// originally inspired from: https://jkettmann.com/jr-to-sr-refactoring-react-pan-and-zoom-image-component

// goes from browser x y positioning (e.g. if we want to handle mouse input) to internal x y positions values
function absoluteToAbstract({ x, y, z, width, height }) {
	return {
		x: x - (1 - z) * (width / 2),
		y: y - (1 - z) * (height / 2),
		z: z,
	};
}

// goes from internal x y position values to browser x y positioning
function abstractToAbsolute({ x, y, z, width, height }) {
	return {
		x: x + (1 - z) * (width / 2),
		y: y + (1 - z) * (height / 2),
		z: z,
	};
}

export default function Graph({
	route,
	render,
	graph,
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
}) {
	const containerRef = useRef();
	const nodesArray = Object.values(nodes);
	const connectionsArray = Object.values(connections);
	const [isPanning, setPanning] = useState(false);
	function onMouseDown(e) {
		//e.preventDefault();
		if (e.button === 2) {
		} else if (e.button === 1) {
			setPanning(true);
			updateNodes(
				nodesArray.map(function (position) {
					return {
						...position,
						oldX: e.clientX,
						oldY: e.clientY,
					};
				}),
			);
		} else if (e.button === 0) {
			if (e.target === containerRef.current) {
				setPanning(true);
				updateNodes(
					nodesArray.map(function (position) {
						return {
							...position,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
				updateConnections(
					connectionsArray.map(function (connection) {
						return {
							...connection,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
			} else {
			}
		} else {
		}
	}
	function onMouseUp(e) {
		setPanning(false);
	}
	function onMouseMove(e) {
		if (isPanning) {
			updateNodes(
				nodesArray.map(function (position) {
					return {
						...position,
						x: position.x + e.clientX - position.oldX,
						y: position.y + e.clientY - position.oldY,
						oldX: e.clientX,
						oldY: e.clientY,
					};
				}),
			);
			updateConnections(
				connectionsArray.map(function (connection) {
					return {
						...connection,
						x: connection.x + e.clientX - connection.oldX,
						y: connection.y + e.clientY - connection.oldY,
						oldX: e.clientX,
						oldY: e.clientY,
					};
				}),
			);
		}
	}
	function onWheel(e) {
		if (e.deltaY) {
			const sign = Math.sign(e.deltaY) / 10;
			const scale = 1 - sign;
			const rect = containerRef.current.getBoundingClientRect();
			updateNodes(
				nodesArray.map(function (position) {
					const x = rect.width / 2 - (rect.width / 2 - position.x) * scale - (position.width / 2) * sign;
					const y = rect.height / 2 - (rect.height / 2 - position.y) * scale - (position.height / 2) * sign;
					return {
						...position,
						x: x,
						y: y,
						z: position.z * scale,
					};
				}),
			);
			updateConnections(
				connectionsArray.map(function (connection, index) {
					//const x = rect.width / 2 - (rect.width / 2 - connection.x) * scale - (nodes[connection.nodeID].width / 2) * sign;
					//const y = rect.height / 2 - (rect.height / 2 - connection.y) * scale - (nodes[connection.nodeID].height / 2) * sign;
					//const x = graph.nodes[connection.nodeID].x + offsets[index].x * scale
					//const y = graph.nodes[connection.nodeID].y + offsets[index].y * scale
					//const x = connection.x * scale
					//const y = connection.y * scale
					//const x = rect.width / 2 - (rect.width / 2 - connection.x) * scale - ((connection.x - nodes[connection.nodeID].x) / 2) * sign;
					//const y = rect.height / 2 - (rect.height / 2 - connection.y) * scale - ((connection.y - nodes[connection.nodeID].y) / 2) * sign;
					return {
						...connection,
						x: null,
						y: null,
					};
				}),
			);
		}
	}
	useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("mousemove", onMouseMove);
		return function () {
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mousemove", onMouseMove);
		};
	});
	return (
		<div className="graph debug-grid relative overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodesArray.map(function (node, index) {
				const absolutePosition = abstractToAbsolute(node);
				if (node.complete) {
					return (
						<Node
							key={node.id}
							route={route}
							render={render}
							x={node.x}
							y={node.y}
							z={node.z}
							width={node.width}
							height={node.height}
							dataX={absolutePosition.x}
							dataY={absolutePosition.y}
							dataZ={absolutePosition.z}
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
						/>
					);
				} else {
					return null;
				}
			})}
			{Object.values(edges).map(function (edge) {
				if (edge.id) {
					//return <div>{edge.id}</div>;
					return (
						<Edge
							key={edge.id}
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
							edge={edge}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
}
