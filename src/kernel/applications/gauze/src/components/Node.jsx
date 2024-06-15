import React from "react";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import * as orchestrate from "./../orchestrate.js";

export default function Node({ agentHeader, route, gauze, model, router, link, graph, x, y, z, width, height, dataX, dataY, dataZ, node, nodes, edges, connections }) {
	const containerRef = useRef();
	const spaceID = route.params.space;
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [isConnecting, setConnecting] = useState(false);
	const [localWidth, setLocalWidth] = useState(width);
	const [localHeight, setLocalHeight] = useState(height);
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const nodeConnections = graph.spaceNodeConnections(agentHeader.name, spaceID, node.id);
	const initialized = height !== null && width !== null;
	function onMouseDown(e) {
		if (initialized) {
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
						graph.updateSpaceNodes(agentHeader.name, spaceID, [
							{
								...graph.selectNode(node.id),
								oldX: e.clientX,
								oldY: e.clientY,
							},
						]);
						graph.updateSpaceConnections(
							agentHeader.name,
							spaceID,
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
	}
	function onMouseUp(e) {
		// note: consider any scenarios where this guard might be a problem (e.g. can we make an uninitialized node while dragging?)
		if (initialized) {
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
	}
	function onMouseMove(e) {
		if (initialized) {
			const interaction = graph.readInteraction();
			if (interaction) {
				// update the relationship_end connection
				const endConnection = {
					...connections[interaction.toConnectionID],
					x: e.clientX,
					y: e.clientY,
				};
				graph.updateConnections([endConnection]);
			} else if (isDragging) {
				const activeNode = graph.selectNode(node.id);
				graph.updateSpaceNodes(agentHeader.name, spaceID, [
					{
						...activeNode,
						oldX: e.clientX,
						oldY: e.clientY,
						x: activeNode.x + e.clientX - activeNode.oldX,
						y: activeNode.y + e.clientY - activeNode.oldY,
						z: activeNode.z,
					},
				]);
				graph.updateSpaceConnections(
					agentHeader.name,
					spaceID,
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
	}
	useLayoutEffect(function () {
		if (!isLoaded || height === null || width === null) {
			const initialized = {
				...node,
				height: containerRef.current.offsetHeight,
				width: containerRef.current.offsetWidth,
			};
			if (spaceID) {
				graph.initializeSpaceNodes(agentHeader.name, spaceID, [initialized]);
			} else {
				graph.initializeNodes(agentHeader.name, [initialized]);
			}
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
	return (
		<div
			className="node flex absolute br4 shadow-2"
			style={{
				transform: `translate(${x}px, ${y}px) scale(${z})`,
				visibility: node.render ? "visible" : "hidden",
			}}
			id={node.id}
			ref={containerRef}
			onMouseDown={onMouseDown}
			data-id={node.id}
			data-x={dataX}
			data-y={dataY}
			data-z={dataZ}
			data-width={width}
			data-height={height}
		>
			<node.component agentHeader={agentHeader} route={route} link={link} nodeID={node.id} {...node.props} />
		</div>
	);
}
