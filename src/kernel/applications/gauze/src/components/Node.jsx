import React from "react";
import { useEffect, useState, useRef } from "react";

export default function Node({ x, y, z, dataX, dataY, dataZ, initializePosition, updatePosition, ...props}) {
	const containerRef = useRef();
	const [isLoaded, setLoaded] = useState(false);
	const [isDragging, setDragging] = useState(false);
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
	});
	function onMouseDown(e) {
		if (e.button === 2) {
		} else if (e.button === 1) {
		} else if (e.button === 0) {
			if (containerRef.current.contains(e.target)) {
				setDragging(true);
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
			updatePosition({
				x: x + e.clientX - position.oldX,
				y: y + e.clientY - position.oldY,
				z: z,
			});
		}
	}
	useEffect(() => {
		if (!isLoaded) {
			initializePosition({ height: containerRef.current.offsetHeight, width: containerRef.current.offsetWidth });
			setLoaded(true);
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
		>
			<props.component {...props} />
		</div>
	);
}
