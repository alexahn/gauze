import React from "react";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Node({ agentHeader, route, x, y, z, width, height, dataX, dataY, dataZ, graph, node, nodes, edges, connections }) {
	const containerRef = useRef();
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [localWidth, setLocalWidth] = useState(width);
	const [localHeight, setLocalHeight] = useState(height);
	/*
	const nodeConnections = Object.values(connections).filter(function (connection) {
		return connection.nodeID === node.id;
	});
	*/
	const activeNodes = graph.activeNodes(agentHeader.name, graph.nodes, graph.edges, graph.connections);
	const activeNode = activeNodes[node.id];
	const activeEdgesArray = graph.activeEdgesArray(graph.nodes, graph.edges, graph.connections);
	const activeConnectionsArray = graph.activeConnectionsArray(graph.nodes, graph.edges, graph.connections);
	const activeNodeConnections = activeConnectionsArray.filter(function (connection) {
		return connection.nodeID === node.id;
	});
	function onMouseDown(e) {
		if (e.button === 2) {
			e.preventDefault();
		} else if (e.button === 1) {
		} else if (e.button === 0) {
			if (containerRef.current.contains(e.target)) {
				setDragging(true);
				graph.updateNodes([
					{
						...activeNode,
						oldX: e.clientX,
						oldY: e.clientY,
					},
				]);
				graph.updateConnections(
					activeNodeConnections.map(function (connection) {
						return {
							...connection,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
				/*
				updateNodes([
					{
						...node,
						oldX: e.clientX,
						oldY: e.clientY,
					},
				]);
				updateConnections(
					nodeConnections.map(function (connection) {
						return {
							...connection,
							oldX: e.clientX,
							oldY: e.clientY,
						};
					}),
				);
				*/
			} else {
			}
		}
	}
	function onMouseUp(e) {
		setDragging(false);
	}
	function onMouseMove(e) {
		if (isDragging) {
			graph.updateNodes([
				{
					...activeNode,
					oldX: e.clientX,
					oldY: e.clientY,
					x: activeNode.x + e.clientX - activeNode.oldX,
					y: activeNode.y + e.clientY - activeNode.oldY,
					z: activeNode.z,
				},
			]);
			graph.updateConnections(
				activeNodeConnections.map(function (connection) {
					return {
						...connection,
						oldX: e.clientX,
						oldY: e.clientY,
						x: connection.x + e.clientX - connection.oldX,
						y: connection.y + e.clientY - connection.oldY,
					};
				}),
			);
			/*
			updateNodes([
				{
					...node,
					oldX: e.clientX,
					oldY: e.clientY,
					x: x + e.clientX - node.oldX,
					y: y + e.clientY - node.oldY,
					z: z,
				},
			]);
			updateConnections(
				nodeConnections.map(function (connection) {
					return {
						...connection,
						oldX: e.clientX,
						oldY: e.clientY,
						x: connection.x + e.clientX - connection.oldX,
						y: connection.y + e.clientY - connection.oldY,
					};
				}),
			);
			*/
		}
	}
	useLayoutEffect(function () {
		if (!isLoaded || height === null || width === null) {
			const initialized = {
				...node,
				height: containerRef.current.offsetHeight,
				width: containerRef.current.offsetWidth,
			};
			graph.initializeNodes([initialized]);
			setLoaded(true);
		}
	});
	useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("mousemove", onMouseMove);
		return function () {
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("mousemove", onMouseMove);
		};
	});
	// todo: remove render from here and define it inside of the connection props
	return (
		<div
			className="node absolute shadow-1"
			style={{
				transform: `translate(${x}px, ${y}px) scale(${z})`,
				visibility: node.render ? "visible" : "hidden",
			}}
			ref={containerRef}
			onMouseDown={onMouseDown}
			data-id={node.id}
			data-x={dataX}
			data-y={dataY}
			data-z={dataZ}
			data-width={width}
			data-height={height}
		>
			<node.component agentHeader={agentHeader} route={route} nodes={nodes} edges={edges} connections={connections} node={node} {...node.props} />
		</div>
	);
}
