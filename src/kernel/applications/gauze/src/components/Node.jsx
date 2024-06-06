import React from "react";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import * as orchestrate from "./../orchestrate.js";

export default function Node({ agentHeader, route, gauze, model, router, link, graph, x, y, z, width, height, dataX, dataY, dataZ, node, nodes, edges, connections }) {
	const containerRef = useRef();
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [isConnecting, setConnecting] = useState(false);
	const [localWidth, setLocalWidth] = useState(width);
	const [localHeight, setLocalHeight] = useState(height);
	const [connect, setConnect] = useState({});
	const activeNodes = graph.activeNodes(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const activeEdges = graph.activeEdges(agentHeader.name);
	const nodeConnections = graph.nodeConnections(node.id);
	function onMouseDown(e) {
		if (e.button === 2) {
			e.preventDefault();
		} else if (e.button === 1) {
		} else if (e.button === 0) {
			if (containerRef.current.contains(e.target)) {
				// note: is there a way to do this elegantly?
				const fromTarget = e.target.closest(".from-start");
				const toTarget = e.target.closest(".to-start");
				const buttonTarget = e.target.closest("button");
				const spanTarget = e.target.closest("span");
				if (fromTarget) {
					setConnecting(true);
					// create two interaction connections
					// create interaction
					const startID = uuidv4();
					const endID = uuidv4();
					graph.createConnections([
						{
							id: startID,
							name: "from_start",
							nodeID: fromTarget.dataset.nodeId,
							entityID: fromTarget.dataset.entityId,
							entityType: fromTarget.dataset.entityType,
							x: e.clientX,
							y: e.clientY,
							z: node.z,
						},
						{
							id: endID,
							name: "from_end",
							nodeID: fromTarget.dataset.nodeId,
							entityID: fromTarget.dataset.entityId,
							entityType: fromTarget.dataset.entityType,
							x: e.clientX,
							y: e.clientY,
							z: node.z,
						},
					]);
					graph.createInteraction({
						fromNodeID: node.id,
						fromConnectionID: startID,
						toNodeID: node.id,
						toConnectionID: endID,
					});
					e.preventDefault();
				} else if (toTarget) {
					setConnecting(true);
					// create two interaction connections
					// create interaction
					const startID = uuidv4();
					const endID = uuidv4();
					graph.createConnections([
						{
							id: startID,
							name: "to_start",
							nodeID: toTarget.dataset.nodeId,
							entityID: toTarget.dataset.entityId,
							entityType: toTarget.dataset.entityType,
							x: e.clientX,
							y: e.clientY,
							z: node.z,
						},
						{
							id: endID,
							name: "to_end",
							nodeID: toTarget.dataset.nodeId,
							entityID: toTarget.dataset.entityId,
							entityType: toTarget.dataset.entityType,
							x: e.clientX,
							y: e.clientY,
							z: node.z,
						},
					]);
					graph.createInteraction({
						fromNodeID: node.id,
						fromConnectionID: startID,
						toNodeID: node.id,
						toConnectionID: endID,
					});
					e.preventDefault();
				} else if (buttonTarget) {
				} else if (spanTarget) {
				} else {
					setDragging(true);
					//e.preventDefault();
					graph.updateNodes([
						{
							...graph.selectNode(node.id),
							oldX: e.clientX,
							oldY: e.clientY,
						},
					]);
					graph.updateConnections(
						graph.selectConnections(nodeConnections.keys).map(function (connection) {
							return {
								...connection,
								oldX: e.clientX,
								oldY: e.clientY,
							};
						}),
					);
				}
			} else {
			}
		}
	}
	function onMouseUp(e) {
		const interaction = graph.readInteraction();
		if (interaction) {
			const fromTarget = e.target.closest(".from-start");
			const toTarget = e.target.closest(".to-start");
			if (fromTarget || toTarget) {
				const target = fromTarget ? fromTarget.dataset : toTarget.dataset;
				const source = connections[interaction.fromConnectionID];
				graph.deleteConnections([connections[interaction.fromConnectionID], connections[interaction.toConnectionID]]);
				graph.deleteInteraction();
				setConnecting(false);
				if (source.name === "from_start") {
					if (target.interaction === "to_end") {
						return orchestrate.createRelationship({ gauze, model, graph }, agentHeader, {
							fromNodeID: target.nodeId,
							fromEntityID: target.entityId,
							fromEntityType: target.entityType,
							toNodeID: source.nodeID,
							toEntityID: source.entityID,
							toEntityType: source.entityType,
						});
					}
				} else if (source.name === "to_start") {
					if (target.interaction === "from_end") {
						return orchestrate.createRelationship({ gauze, model, graph }, agentHeader, {
							fromNodeID: source.nodeID,
							fromEntityID: source.entityID,
							fromEntityType: source.entityType,
							toNodeID: target.nodeId,
							toEntityID: target.entityId,
							toEntityType: target.entityType,
						});
					}
				} else {
					graph.deleteConnections([connections[interaction.fromConnectionID], connections[interaction.toConnectionID]]);
					graph.deleteInteraction();
					setConnecting(false);
				}
			} else {
				graph.deleteConnections([connections[interaction.fromConnectionID], connections[interaction.toConnectionID]]);
				graph.deleteInteraction();
				setConnecting(false);
			}
		} else if (isDragging) {
			setDragging(false);
		} else {
		}
	}
	function onMouseMove(e) {
		const interaction = graph.readInteraction();
		if (interaction) {
			// update the relationship_end connection
			const endConnection = {
				...connections[interaction.toConnectionID],
				x: e.clientX,
				y: e.clientY,
			};
			//console.log('updating end connection', endConnection)
			graph.updateConnections([endConnection]);
		} else if (isDragging) {
			const activeNode = graph.selectNode(node.id);
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
				graph.selectConnections(nodeConnections.keys).map(function (connection) {
					return {
						...connection,
						oldX: e.clientX,
						oldY: e.clientY,
						x: connection.x + e.clientX - connection.oldX,
						y: connection.y + e.clientY - connection.oldY,
					};
				}),
			);
		}
	}
	useLayoutEffect(function () {
		if (!isLoaded || height === null || width === null) {
			const initialized = {
				...node,
				height: containerRef.current.offsetHeight,
				width: containerRef.current.offsetWidth,
			};
			graph.initializeNodes(agentHeader.name, [initialized]);
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
			className="node flex absolute br4 shadow-2"
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
			<node.component agentHeader={agentHeader} route={route} link={link} nodes={nodes} edges={edges} connections={connections} node={node} {...node.props} />
		</div>
	);
}
