import React from "react";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Node({
	route,
	render,
	x,
	y,
	z,
	width,
	height,
	dataX,
	dataY,
	dataZ,
	node,
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
	createConnections,
	readConnections,
	updateConnections,
	deleteConnections,
}) {
	const containerRef = useRef();
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [localWidth, setLocalWidth] = useState(width);
	const [localHeight, setLocalHeight] = useState(height);
	function onMouseDown(e) {
		if (e.button === 2) {
			e.preventDefault();
		} else if (e.button === 1) {
		} else if (e.button === 0) {
			if (containerRef.current.contains(e.target)) {
				setDragging(true);
				updateNodes([
					{
						...node,
						oldX: e.clientX,
						oldY: e.clientY,
					},
				]);
			} else {
			}
		}
	}
	function onMouseUp(e) {
		setDragging(false);
	}
	function onMouseMove(e) {
		if (isDragging) {
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
		}
	}
	useLayoutEffect(function () {
		if (!isLoaded || height === null || width === null) {
			render.unsubscribe(route.name, "NODE", node.id, node.id);
			render.subscribe(route.name, "NODE", node.id, node.id, function (data) {
				setTimeout(function () {
					const initialized = {
						...node,
						height: containerRef.current.offsetHeight,
						width: containerRef.current.offsetWidth,
					};
					initializeNodes([initialized]);
					render.unsubscribe(route.name, "NODE", node.id, node.id);
					setLoaded(true);
				}, 0);
			});
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
			className="absolute shadow-1"
			style={{
				transform: `translate(${x}px, ${y}px) scale(${z})`,
				visibility: node.render ? "visible" : "hidden",
			}}
			ref={containerRef}
			onMouseDown={onMouseDown}
			data-x={dataX}
			data-y={dataY}
			data-z={dataZ}
			data-width={width}
			data-height={height}
		>
			<node.component
				route={route}
				node={node}
				nodes={nodes}
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
				createConnections={createConnections}
				readConnections={readConnections}
				updateConnections={updateConnections}
				deleteConnections={deleteConnections}
				{...node.props}
			/>
		</div>
	);
}
