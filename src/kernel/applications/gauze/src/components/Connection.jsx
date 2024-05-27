import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({ route, gauze, model, router, render, node, connection, initializeConnections }) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		//console.log('connection', connection)
		if (node.height === null || node.width === null) {
			render.unsubscribe(route.name, "NODE", node.id, connection.id);
			render.subscribe(route.name, "NODE", node.id, connection.id, function (data) {
				setTimeout(function () {
					const containerRects = containerRef.current.getClientRects()[0];
					const initialized = {
						...connection,
						height: containerRef.current.offsetHeight,
						width: containerRef.current.offsetWidth,
						x: containerRects.x,
						y: containerRects.y,
					};
					initializeConnections([initialized]);
					render.unsubscribe(route.name, "NODE", node.id, connection.id);
				}, 0);
			});
		}
		//console.log("connection", containerRef.current.getClientRects()[0]);
	});
	return <div ref={containerRef}>Connection</div>;
}
