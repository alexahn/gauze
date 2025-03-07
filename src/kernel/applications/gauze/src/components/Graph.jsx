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

export default function Graph({ agentHeader, route, gauze, model, router, link, graph, nodes, edges, connections, interaction }) {
	const containerRef = useRef();
	const spaceID = route.params.space;
	const nodesArray = Object.values(nodes);
	const connectionsArray = Object.values(connections);
	const [isPanning, setPanning] = useState(false);
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const nodesInitialized = activeNodes.values.every(function (node) {
		return node.width !== null && node.height !== null;
	});
	// note: we can't use the below unless we only selectively set x and y to null for the connections that are shown on the screen
	// note: we are currently setting x and y to null to trigger a recalculation for all active connections
	/*
	const connectionsInitialized = activeConnections.values.every(function (connection) {
		return connection.x !== null && connection.y !== null;
	});
	*/
	function onMouseDown(e) {
		if (nodesInitialized) {
			if (e.button === 2) {
			} else if (e.button === 1) {
				setPanning(true);
				graph.updateSpaceNodes(
					agentHeader.name,
					spaceID,
					graph.selectNodes(activeNodes.keys).map(function (position) {
						return {
							...position,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
				graph.updateSpaceConnections(
					agentHeader.name,
					spaceID,
					graph.selectConnections(activeConnections.keys).map(function (connection) {
						return {
							...connection,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
			} else if (e.button === 0) {
				if (e.target === containerRef.current) {
					e.preventDefault();
					setPanning(true);
					graph.updateSpaceNodes(
						agentHeader.name,
						spaceID,
						graph.selectNodes(activeNodes.keys).map(function (position) {
							return {
								...position,
								oldX: e.clientX,
								oldY: e.clientY,
							};
						}),
					);
					graph.updateSpaceConnections(
						agentHeader.name,
						spaceID,
						graph.selectConnections(activeConnections.keys).map(function (connection) {
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
	}
	function onMouseUp(e) {
		// note: consider any scenarios where this guard might be a problem (e.g. can we make an uninitialized node while panning?)
		if (nodesInitialized) {
			setPanning(false);
		}
	}
	function onMouseMove(e) {
		if (nodesInitialized) {
			if (isPanning) {
				graph.updateSpaceNodes(
					agentHeader.name,
					spaceID,
					graph.selectNodes(activeNodes.keys).map(function (node) {
						return {
							...node,
							x: node.x + e.clientX - node.oldX,
							y: node.y + e.clientY - node.oldY,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
				graph.updateSpaceConnections(
					agentHeader.name,
					spaceID,
					graph.selectConnections(activeConnections.keys).map(function (connection) {
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
	}
	function onWheel(e) {
		if (nodesInitialized) {
			if (e.deltaY) {
				const sign = Math.sign(e.deltaY) / 10;
				const scale = 1 - sign;
				const rect = containerRef.current.getBoundingClientRect();
				graph.updateSpaceNodes(
					agentHeader.name,
					spaceID,
					graph.selectNodes(activeNodes.keys).map(function (node) {
						const x = rect.width / 2 - (rect.width / 2 - node.x) * scale - (node.width / 2) * sign;
						const y = rect.height / 2 - (rect.height / 2 - node.y) * scale - (node.height / 2) * sign;
						return {
							...node,
							x: x,
							y: y,
							z: node.z * scale,
						};
					}),
				);
				graph.updateSpaceConnections(
					agentHeader.name,
					spaceID,
					graph.selectConnections(activeConnections.keys).map(function (connection) {
						const x = rect.width / 2 - (rect.width / 2 - connection.x) * scale;
						const y = rect.height / 2 - (rect.height / 2 - connection.y) * scale;
						return {
							...connection,
							x: x,
							y: y,
							z: connection.z * scale,
						};
					}),
				);
			}
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
		<div className="graph relative overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodesArray.map(function (node, index) {
				const absolutePosition = abstractToAbsolute(node);
				if (node.complete) {
					return (
						<Node
							key={node.id}
							agentHeader={agentHeader}
							route={route}
							gauze={gauze}
							model={model}
							router={router}
							link={link}
							graph={graph}
							x={node.x}
							y={node.y}
							z={node.z}
							width={node.width}
							height={node.height}
							dataX={absolutePosition.x}
							dataY={absolutePosition.y}
							dataZ={absolutePosition.z}
							nodes={nodes}
							edges={edges}
							connections={connections}
							node={node}
						/>
					);
				} else {
					return null;
				}
			})}
			{Object.values(edges).map(function (edge) {
				if (edge.id) {
					return <Edge key={edge.id} agentHeader={agentHeader} route={route} graph={graph} nodes={nodes} edges={edges} connections={connections} edge={edge} />;
				} else {
					return null;
				}
			})}
			{interaction ? <Edge agentHeader={agentHeader} route={route} graph={graph} nodes={nodes} edges={edges} connections={connections} edge={interaction} /> : null}
		</div>
	);
}
