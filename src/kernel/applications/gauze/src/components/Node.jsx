import React from "react";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Node({ route, render, index, x, y, z, width, height, dataX, dataY, dataZ, initializeNode, updateNode, createNode, deleteNode, node }) {
	const containerRef = useRef();
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
	});
	function onMouseDown(e) {
		if (e.button === 2) {
			e.preventDefault();
			//deleteNode(index);
		} else if (e.button === 1) {
		} else if (e.button === 0) {
			if (containerRef.current.contains(e.target)) {
				setDragging(true);
				//createNode()
				setPosition({
					oldX: e.clientX,
					oldY: e.clientY,
				});
			} else {
			}
		}
	}
	function onMouseUp(e) {
		setDragging(false);
	}
	function onMouseMove(e) {
		if (isDragging) {
			setPosition({
				oldX: e.clientX,
				oldY: e.clientY,
			});
			updateNode(index, {
				x: x + e.clientX - position.oldX,
				y: y + e.clientY - position.oldY,
				z: z,
			});
		}
	}
	useEffect(() => {
		const subscriptionID = uuidv4();
		if (!isLoaded) {
			// if subscribed already, unsubscribe, and resubscribe
			// if not subscribe, subscribe
			render.unsubscribe(route.name, "NODE", index, index);
			render.subscribe(route.name, "NODE", index, index, function (data) {
				setTimeout(function () {
					initializeNode(index, { height: containerRef.current.offsetHeight, width: containerRef.current.offsetWidth });
					render.unsubscribe(route.name, "NODE", index, subscriptionID);
					setLoaded(true);
				}, 0);
			});
		}
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
			}}
			onMouseDown={onMouseDown}
			ref={containerRef}
			data-x={dataX}
			data-y={dataY}
			data-z={dataZ}
			data-width={width}
			data-height={height}
		>
			<node.component {...node.props} />
		</div>
	);
}
