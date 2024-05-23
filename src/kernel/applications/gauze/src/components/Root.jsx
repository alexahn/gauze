import React from "react";
import { useState } from "react";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";

export default function Root({ gauze, model, router }) {
	function node1() {
		return (<h1>Hello</h1>)
	}
	function node2() {
		return (<h1>Goodbye</h1>)
	}
	const nodes = [
		{
			key: "1",
			x: 0,
			y: 0,
			z: 1,
			component: node1,
			props: {},
		},
		{
			key: "2",
			x: 100,
			y: 100,
			z: 1,
			component: node2,
			props: {},
		},
		{
			key: "3",
			x: 100,
			y: 200,
			z: 1,
			component: node1,
			props: {},
		},
		{
			key: "4",
			x: 100,
			y: 300,
			z: 1,
			component: node2,
			props: {},
		},
		{
			key: "5",
			x: 200,
			y: 200,
			z: 1,
			component: node1,
			props: {},
		},
		{
			key: "6",
			x: 200,
			y: 300,
			z: 1,
			component: node2,
			props: {},
		},
	];
	return <Graph nodes={nodes} />;
}
