import React from "react";
import { useEffect, useState, useRef } from "react";

export default function Node({ x, y, z, initializeNode, updatePosition, gauze, model, router }) {
	const [isLoaded, setLoaded] = useState(false)
	const [isDragging, setDragging] = useState(false);
	const [position, setPosition] = useState({
        oldX: 0,
        oldY: 0,
    });
	const containerRef = useRef();
    const onMouseDown = (e) => { 
        if (!containerRef.current.contains(e.target)) { 
            console.log("ignoring node", e.target, containerRef.current); 
            return; 
        } 
        setDragging(true); 
        setPosition({ 
            oldX: e.clientX, 
            oldY: e.clientY, 
        }); 
    };
    useEffect(() => {
		if (!isLoaded) {
			setTimeout(function () {
				initializeNode({ height: containerRef.current.offsetHeight, width: containerRef.current.offsetWidth })
			}, 0)
			console.log('loaded node', containerRef.current.offsetHeight, containerRef.current.offsetWidth)
			setLoaded(true)
		}
        const mouseup = () => {
            setDragging(false);
        };
        const mousemove = (event) => {
            if (isDragging) {
				setPosition({
					oldX: event.clientX,
					oldY: event.clientY
				})
				updatePosition({
					x: x + event.clientX - position.oldX,
					y: y + event.clientY - position.oldY,
					z: z
				})
                /*
                setPosition({
                    ...position,
                    x: position.x + event.clientX - position.oldX,
                    y: position.y + event.clientY - position.oldY,
                    oldX: event.clientX,
                    oldY: event.clientY,
                });
                */
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
		<div
			className="w4"
			style={{
				transform: `translate(${x}px, ${y}px) scale(${z})`,
			}}
			onMouseDown={onMouseDown}
			ref={containerRef}
		>
			<h1>Hello</h1>
		</div>
	);
}
