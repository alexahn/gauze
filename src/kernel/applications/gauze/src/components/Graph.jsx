import React, { useEffect, useRef, useState, useCallback } from "react";

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

export default function Graph({ route, render, nodes, setNodes, initializeNode, updateNode, createNode, deleteNode }) {
	const containerRef = useRef();
	const [isPanning, setPanning] = useState(false);
	function onMouseDown(e) {
		//e.preventDefault();
		if (e.button === 2) {
		} else if (e.button === 1) {
			setPanning(true);
			setNodes(
				nodes.map(function (position) {
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
				setNodes(
					nodes.map(function (position) {
						return {
							...position,
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
			setNodes(
				nodes.map(function (position) {
					return {
						...position,
						x: position.x + e.clientX - position.oldX,
						y: position.y + e.clientY - position.oldY,
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
			setNodes(
				nodes.map(function (position) {
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
		<div className="debug-grid relative overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodes.map(function (node, index) {
				const absolutePosition = abstractToAbsolute(nodes[index]);
				return (
					<Node
						key={index}
						route={route}
						render={render}
						component={nodes[index].component}
						index={index}
						x={nodes[index].x}
						y={nodes[index].y}
						z={nodes[index].z}
						width={nodes[index].width}
						height={nodes[index].height}
						dataX={absolutePosition.x}
						dataY={absolutePosition.y}
						dataZ={absolutePosition.z}
						initializeNode={initializeNode}
						createNode={createNode}
						updateNode={updateNode}
						deleteNode={deleteNode}
						{...nodes[index].props}
					/>
				);
			})}
		</div>
	);
}
