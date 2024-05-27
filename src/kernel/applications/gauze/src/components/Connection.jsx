import React from "react";
import { useState, useLayoutEffect, useRef } from "react";

export default function Connection({ gauze, model, router }) {
	const containerRef = useRef();
	useLayoutEffect(function () {
		//console.log("connection", containerRef.current.getClientRects());
	});
	return <div ref={containerRef}>Connection</div>;
}
