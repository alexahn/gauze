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

export default function Graph({ route, render, nodes, setNodes, initializeNode, updateNode }) {
	const containerRef = useRef();
	const [isPanning, setPanning] = useState(false);
	//const [nodePositions, setNodePositions] = useState(nodes)
	const [nodePositions, setNodePositions] = useState(function () {
		return nodes.map(function (node) {
			return {
				...node,
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
			};
		});
	});
	if (nodePositions.length < nodes.length) {
		const added = nodes.slice(nodePositions.length).map(function (node) {
			return {
				...node,
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: nodePositions[0].z,
				height: null,
				width: null,
			};
		});
		const updated = [...nodePositions].concat(added);
		setNodePositions(updated);
	}
	function onMouseDown(e) {
		//e.preventDefault();
		if (e.button === 2) {
		} else if (e.button === 1) {
			setPanning(true);
			/*
			nodePositions.forEach(function (value) {
				const [position, setPosition] = value;
				setPosition({
					...position,
					oldX: e.clientX,
					oldY: e.clientY,
				});
			});
			*/
			/*
			setNodes(nodes.map(function (position) {
				return {
					...position,
					oldX: e.clientX,
					oldY: e.clientY
				}
			}))
			*/
			setNodePositions(
				nodePositions.map(function (position) {
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
				/*
				nodePositions.forEach(function (value) {
					const [position, setPosition] = value;
					setPosition({
						...position,
						oldX: e.clientX,
						oldY: e.clientY,
					});
				});
				*/
				/*
				setNodes(nodes.map(function (position) {
					return {
						...position,
						oldX: e.clientX,
						oldY: e.clientY
					}
				}))
				*/
				setNodePositions(
					nodePositions.map(function (position) {
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
			/*
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
			*/
			/*
			setNodes(nodes.map(function (position) {
				return {
					...position,
					x: position.x + e.clientX - position.oldX,
					y: position.y + e.clientY - position.oldY,
					oldX: e.clientX,
					oldY: e.clientY,
				}
			}))
			*/
			setNodePositions(
				nodePositions.map(function (position) {
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
			/*
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
			*/
			/*
			setNodes(nodes.map(function (position) {
				const x = rect.width / 2 - (rect.width / 2 - position.x) * scale - (position.width / 2) * sign;
				const y = rect.height / 2 - (rect.height / 2 - position.y) * scale - (position.height / 2) * sign;
				return {
					...position,
					x: x,
					y: y,
					z: position.z * scale,
				}
			}))
			*/
			setNodePositions(
				nodePositions.map(function (position) {
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
	function initializePosition(index) {
		return function ({ height, width }) {
			console.log("initializePosition", index);
			/*
			const [position, setPosition] = nodePositions[index];
			setPosition({
				...position,
				height: height,
				width: width,
			});
			*/
			const updated = nodePositions.slice();
			const x = 0 < index ? updated[index - 1].x + updated[index - 1].width + 10 : 0;
			const y = 0 < index ? updated[index - 1].y + updated[index - 1].height + 10 : 0;
			updated[index] = {
				...updated[index],
				height: height,
				width: width,
				x,
				y,
			};
			console.log("updated", updated);
			setNodePositions(updated);
		};
	}
	function updatePosition(index) {
		return function ({ x, y, z }) {
			/*
			const [position, setPosition] = nodePositions[index];
			setPosition({
				...position,
				x: x,
				y: y,
				z: z,
			});
			*/
			const updated = nodePositions.slice();
			updated[index] = {
				...updated[index],
				x: x,
				y: y,
				z: z,
			};
			setNodePositions(updated);
		};
	}
	const initializeStart = nodePositions.findIndex(function (position) {
		return position.width === null && position.height === null;
	});
	if (0 <= initializeStart) {
		setTimeout(function () {
			render.create(route.name, "NODE", initializeStart, true);
		}, 0);
	}
	return (
		<div className="debug-grid relative overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodePositions.map(function (node, index) {
				const absolutePosition = abstractToAbsolute(nodePositions[index]);
				return (
					<Node
						key={index}
						route={route}
						render={render}
						component={nodes[index].component}
						index={index}
						/*
						x={nodes[index].x}
						y={nodes[index].y}
						z={nodes[index].z}
						width={nodes[index].width}
						height={nodes[index].height}
						*/
						x={nodePositions[index].x}
						y={nodePositions[index].y}
						z={nodePositions[index].z}
						width={nodePositions[index].width}
						height={nodePositions[index].height}
						dataX={absolutePosition.x}
						dataY={absolutePosition.y}
						dataZ={absolutePosition.z}
						initializeNode={initializeNode}
						updateNode={updateNode}
						initializePosition={initializePosition(index)}
						updatePosition={updatePosition(index)}
						{...nodes[index].props}
					/>
				);
			})}
		</div>
	);
}
