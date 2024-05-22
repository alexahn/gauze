import React, { useEffect, useRef, useState } from "react";

// from: https://jkettmann.com/jr-to-sr-refactoring-react-pan-and-zoom-image-component

//import './PanAndZoomImage.css';

// useRef
// refContainer.current.offsetWidth
// refContainer.current.offsetHeight

export default function Stage({ nodes }) {
	const [isPanning, setPanning] = useState(false);
	const [nodePositions, setNodePositions] = useState(nodes.map(function (node) {
		return {
			oldX: 0,
			oldY: 0,
			x: node.x,
			y: node.y,
			z: node.z,
			height: 0, // note: some race condition when initializing this value and getting the initial size from the node
			width: 0
		}
	}))
	const [image, setImage] = useState({
		width: 1,
		height: 1,
	});
	const [position, setPosition] = useState({
		oldX: 0,
		oldY: 0,
		x: 0,
		y: 0,
		z: 1,
	});
	const containerRef = useRef();
	const onLoad = (e) => {
		setImage({
			width: e.target.naturalWidth,
			height: e.target.naturalHeight,
		});
	};
	const onMouseDown = (e) => {
		console.log("mousedown target", e.target, e);
		//e.preventDefault();
		if (e.target !== containerRef.current) {
			console.log("ignoring");
			return;
		}
		setPanning(true);
		console.log('down', nodePositions)
		setNodePositions(nodePositions.map(function (position) {
			return {
				...position,
				oldX: e.clientX,
				oldY: e.clientY,
			}
		}))
	};
	const onWheel = (e) => {
		if (e.deltaY) {
			console.log("update zoom");
			const sign = Math.sign(e.deltaY) / 10;
			const scale = 1 - sign;
			const rect = containerRef.current.getBoundingClientRect();
			console.log(nodePositions)
			setNodePositions(nodePositions.map(function (position, index) {
				/*
				return {
					...position,
					x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
					y: position.y * scale - ((image.height * rect.width) / image.width / 2 - e.clientY + rect.y) * sign,
					z: position.z * scale,
				}
				*/
				console.log('position', position, index)
				/*
				const x = (position.x + (position.width / 2)) < e.clientX 
					? (position.x * scale) - ((e.clientX - (position.x + (position.width / 2))) * sign)
					: (position.x * scale) + (((position.x + (position.width / 2)) - e.clientX) * sign)
				const y = (position.y + (position.height / 2)) < e.clientY
					? (position.y * scale) - ((e.clientX - (position.y + (position.height / 2))) * sign)
					: (position.y * scale) + (((position.y + (position.height / 2)) - e.clientY) * sign)
				*/
				const x = (position.x * scale) + ((e.clientX - (position.x + (position.width / 2)) + (position.width / 2)) * sign)
				const y = (position.y * scale) + ((e.clientY - (position.y + (position.height / 2)) + (position.height / 2)) * sign)
				return {
					...position,
					x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
					y: position.y * scale - (rect.height / 2 - e.clientY + rect.y) * sign,
					//x: (position.x * scale) - (((position.x - rect.width) / e.clientX) * sign),
					//y: (position.y * scale) - (((position.y - rect.height) / e.clientY) * sign),
					//x: position.x < e.clientX ? (position.x * scale) - ((e.clientX - position.x) * sign) : (position.x * scale) - ((position.x - e.clientX) * sign),
					//y: position.y < e.clientY ? (position.y * scale) - ((e.clientY - position.y) * sign) : (position.y * scale) - ((position.y - e.clientY) * sign),
					//x: x,
					//y: y,
					//x: position.x < e.clientX ? (position.x * scale) + (e.clientX * sign) : (position.x * scale) - (e.clientX * sign),
					//y: position.y < e.clientY ? (position.y * scale) + (e.clientY * sign) : (position.y * scale) - (e.clientY * sign),
					z: position.z * scale,
				}
			}))
		}
	};
	useEffect(() => {
		const mouseup = () => {
			setPanning(false);
		};
		const mousemove = (event) => {
			if (isPanning) {
				setNodePositions(nodePositions.map(function (position) {
					return {
						...position,
						x: position.x + event.clientX - position.oldX,
						y: position.y + event.clientY - position.oldY,
						oldX: event.clientX,
						oldY: event.clientY,
					}
				}))
			}
		};
		window.addEventListener("mouseup", mouseup);
		window.addEventListener("mousemove", mousemove);
		return () => {
			window.removeEventListener("mouseup", mouseup);
			window.removeEventListener("mousemove", mousemove);
		};
	});
	function initializeNode(index) {
		return function ({ height, width }) {
			console.log('start initializing node', index)
			const copy = nodePositions.slice()
			copy[index] = {
				...copy[index],
				height: height,
				width: width
			}
			console.log('copy', copy)
			setNodePositions(copy)
			/*
			setNodePositions(nodePositions.map(function (node, idx) {
				if (index === idx) {
					console.log('setting', idx, height, width)
					return {
						...node,
						height: height,
						width: width
					}
				} else {
					console.log('node', idx, node)
					return node
				}
			}))
			*/
			console.log('finish initializing', index)
		}
	}
	function updateNodePosition(index) {
		return function ({ x, y, z }) {
			console.log('updateNodePosition', index)
			setNodePositions(nodePositions.map(function (node, idx) {
				if (index === idx) {
					return {
						...node,
						x: x,
						y: y,
						z: z,
					}
				} else {
					return node
				}
			}))
			console.log('finish updateNodePosition', index)
		}
	}
	// todo: make a chain of promises wrapping initializeNode
	// e.g. [promise1, promise2, promise3] where promise2 is promise1.then(initializeNode), and promise3 is promise2.then(initializeNode)
	// i think we need to force the initialization to happen on separate event ticks
	return (
		<div className="overflow-hidden mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			{nodes.map(function (node, index) {
				return (<node.component
							key={index}
							x={nodePositions[index].x}
							y={nodePositions[index].y}
							z={nodePositions[index].z}
							initializeNode={initializeNode(index)}
							updatePosition={updateNodePosition(index)}
							{...nodes[index].props}
						/>)
			})}
		</div>
	);
};
