import React from "react";
import { useState } from "react";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";

import * as jose from "jose";

export default function Root({ gauze, model, router, route, render }) {
	// create first node based on session type
	const [added, setAdded] = useState(false);
	// load from local storage in the future
	const systemJWT = gauze.getSystemJWT();
	const systemJWTPayload = jose.decodeJwt(systemJWT);
	const [nodes, setNodes] = useState(function () {
		console.log("ONLY CALL ONCE");
		return [
			{
				key: "1",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node1,
				props: {
					type: systemJWTPayload.agent_type,
					from: null,
					to: null,
					variables: {},
				},
			},
			{
				key: "2",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node2,
				props: {},
			},
			{
				key: "3",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node1,
				props: {},
			},
			{
				key: "4",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node2,
				props: {},
			},
			{
				key: "5",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node1,
				props: {},
			},
			{
				key: "6",
				oldX: 0,
				oldY: 0,
				x: null,
				y: null,
				z: 1,
				height: null,
				width: null,
				component: node2,
				props: {},
			},
		];
	});
	function initializeNode(index, { width, height }) {
		const updated = [...nodes];
		const x = 0 < index ? updated[index - 1].x + updated[index - 1].width * updated[index - 1].z + 10 * updated[index - 1].z : 0;
		const y = 0 < index ? updated[index - 1].y + updated[index - 1].height * updated[index - 1].z + 10 * updated[index - 1].z : 0;
		updated[index] = {
			...updated[index],
			width,
			height,
			x,
			y,
			z: updated[0].z,
		};
		setNodes(updated);
	}
	function createNode(node) {
		const updated = [...nodes];
		updated.push({
			...updated[0],
			x: null,
			y: null,
			z: null,
			oldX: 0,
			oldY: 0,
			width: null,
			height: null,
			props: {
				text: "end",
			},
		});
		setNodes(updated);
	}
	function updateNode(index, node) {
		const updated = [...nodes];
		updated[index] = {
			...updated[index],
			...node,
		};
		setNodes(updated);
	}
	function deleteNode(index) {
		const updated = [...nodes];
		updated.splice(index, 1);
		setNodes(updated);
	}
	function node1({ text }) {
		return <h1>Hello {text}</h1>;
	}
	function node2({ text }) {
		return <h1>Goodbye {text}</h1>;
	}
	const initializeStart = nodes.findIndex(function (position) {
		return position.width === null && position.height === null;
	});
	if (0 <= initializeStart) {
		setTimeout(function () {
			render.create(route.name, "NODE", initializeStart, true);
		}, 0);
	}
	return (
		<Graph
			key={"graph"}
			route={route}
			render={render}
			nodes={nodes}
			setNodes={setNodes}
			initializeNode={initializeNode}
			updateNode={updateNode}
			createNode={createNode}
			deleteNode={deleteNode}
		/>
	);
}
