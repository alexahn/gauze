import React, { useEffect, useRef, useState } from "react";

// from: https://jkettmann.com/jr-to-sr-refactoring-react-pan-and-zoom-image-component

//import './PanAndZoomImage.css';

// useRef
// refContainer.current.offsetWidth
// refContainer.current.offsetHeight

const PanAndZoom = ({ children }) => {
	const [isPanning, setPanning] = useState(false);
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
		console.log("mousedown target", e.target);
		//e.preventDefault();
		/*
		if (e.target !== containerRef.current) {
			console.log("ignoring");
			return;
		}
		*/
		setPanning(true);
		setPosition({
			...position,
			oldX: e.clientX,
			oldY: e.clientY,
		});
	};
	const onWheel = (e) => {
		if (e.deltaY) {
			console.log("update zoom");
			const sign = Math.sign(e.deltaY) / 10;
			const scale = 1 - sign;
			const rect = containerRef.current.getBoundingClientRect();
			setPosition({
				...position,
				x: position.x * scale - (rect.width / 2 - e.clientX + rect.x) * sign,
				y: position.y * scale - ((image.height * rect.width) / image.width / 2 - e.clientY + rect.y) * sign,
				z: position.z * scale,
			});
		}
	};
	useEffect(() => {
		const mouseup = () => {
			setPanning(false);
		};
		const mousemove = (event) => {
			if (isPanning) {
				setPosition({
					...position,
					x: position.x + event.clientX - position.oldX,
					y: position.y + event.clientY - position.oldY,
					oldX: event.clientX,
					oldY: event.clientY,
				});
			}
		};
		window.addEventListener("mouseup", mouseup);
		window.addEventListener("mousemove", mousemove);
		return () => {
			window.removeEventListener("mouseup", mouseup);
			window.removeEventListener("mousemove", mousemove);
		};
	});
	return (
		<div className="PanAndZoomImage-container mw-100 mh-100 h-100 w-100" ref={containerRef} onMouseDown={onMouseDown} onWheel={onWheel}>
			<div
				style={{
					transform: `translate(${position.x}px, ${position.y}px) scale(${position.z})`,
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default PanAndZoom;
