import React from "react";
import { useState } from "react";

//import PanAndZoom from "./PanAndZoom.jsx";
import Stage from "./Stage.jsx"
import Node from "./Node.jsx"

export default function Root({ gauze, model, router }) {
	/*
	const children = (
		<div className="w4 pa2">
			<h1>Root</h1>
			<input className="pl1 pr1" />
			<h1>Test</h1>
		</div>
	);
	*/

	const nodes = [{
		key: '1',
		x: 0,
		y: 0,
		z: 1,
		component: Node,
		props: {}
	}, {
		key: '2',
		x: 100,
		y: 100,
		z: 1,
		component: Node,
		props: {}
	}]
	return (
		<Stage nodes={nodes} />
	);
}
