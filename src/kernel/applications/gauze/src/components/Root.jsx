import React from "react";
import { useState } from "react";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";

export default function Root({ gauze, model, router }) {
	const nodes = [
		{
			key: "1",
			x: 0,
			y: 0,
			z: 1,
			component: Node,
			props: {},
		},
		{
			key: "2",
			x: 100,
			y: 100,
			z: 1,
			component: Node,
			props: {},
		},
	];
	return <Graph nodes={nodes} />;
}
