import React, { useEffect, useRef, useState } from "react";

import Node from "./Node.jsx";

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

export default function Graph({ nodes }) {
	const containerRef = useRef();
	const [isPanning, setPanning] = useState(false);
	const nodePositions = [];
	nodes.map(function (node, index) {
		nodePositions[index] = useState({
			oldX: 0,
			oldY: 0,
			x: node.x,
			y: node.y,
			z: node.z,
			height: 0,
			width: 0,
		});
	});
	function onMouseDown(e) {
		//e.preventDefault();
		if (e.button === 2) {
		} else if (e.button === 1) {
			setPanning(true);
			nodePositions.forEach(function (value) {
				const [position, setPosition] = value;
				setPosition({
					...position,
					oldX: e.clientX,
					oldY: e.clientY,
				});
			});
		} else if (e.button === 0) {
			if (e.target === containerRef.current) {
				setPanning(true);
				nodePositions.forEach(function (value) {
					const [position, setPosition] = value;
					setPosition({
						...position,
						oldX: e.clientX,
						oldY: e.clientY,
					});
				});
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
			nodePositions.forEach(function (value) {
				const [position, setPosition] = value;
				setPosition({
					...position,
					x: position.x + e.clientX - position.oldX,
					y: position.y + e.clientY - position.oldY,
					oldX: e.clientX,
					oldY: e.clientY,
				});
			});
		}
	}
	function onWheel(e) {
		if (e.deltaY) {
			const sign = Math.sign(e.deltaY) / 10;
			const scale = 1 - sign;
			const rect = containerRef.current.getBoundingClientRect();
			nodePositions.forEach(function (value) {
				const [position, setPosition] = value;
				const x = rect.width / 2 - (rect.width / 2 - position.x) * scale - (position.width / 2) * sign;
				const y = rect.height / 2 - (rect.height / 2 - position.y) * scale - (position.height / 2) * sign;
				setPosition({
					...position,
					x: x,
					y: y,
					z: position.z * scale,
				});
			});
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
	function initializePosition(index) {
		return function ({ height, width }) {
			const [position, setPosition] = nodePositions[index];
			setPosition({
				...position,
				height: height,
				width: width,
			});
		};
	}
	function updatePosition(index) {
		return function ({ x, y, z }) {
			const [position, setPosition] = nodePositions[index];
			setPosition({
				...position,
				x: x,
				y: y,
				z: z,
			});
		};
	}
	return (
		<div className="debug-grid relative overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodes.map(function (node, index) {
				const absolutePosition = abstractToAbsolute(nodePositions[index][0]);
				return (
					<Node
						component={node.component}
						key={index}
						x={nodePositions[index][0].x}
						y={nodePositions[index][0].y}
						z={nodePositions[index][0].z}
						dataX={absolutePosition.x}
						dataY={absolutePosition.y}
						dataZ={absolutePosition.z}
						initializePosition={initializePosition(index)}
						updatePosition={updatePosition(index)}
						{...nodes[index].props}
					/>
				);
			})}
		</div>
	);
}
