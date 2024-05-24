import React from "react";
import { useState } from "react";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

import * as jose from "jose";

export default function Root({ gauze, model, router, route, render }) {
	// create first node based on session type
	const [loaded, setLoaded] = useState(false);
	const [initialized, setInitialized] = useState(false);
	// note: load from local storage in the future
	// note: parse all nodes, and stitch together one graphql query
	// note: refresh the data section for all nodes on load
	// note: we don't need to wait until the query is done to present data, because we can present the data from local storage
	const headers = model.all("HEADER");
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
				component: Table,
				props: {
					gauze: gauze,
					model: model,
					router: router,
					type: null,
					table_name: systemJWTPayload.agent_type,
					from: null,
					to: null,
					variables: {
						where: {},
					},
					data: [],
					count: 0,
				},
			},
		];
	});
	if (!loaded) {
		setLoaded(true);
		// query per node for now, but stitch together a single query later (shouldn't be too hard because we can just create named query (using a hash) for every node
		nodes.forEach(function (node, index) {
			let header = null;
			if (node.props.type) {
				header = model.read("HEADER", node.props.type);
			} else if (node.props.table_name) {
				header = headers.find(function (header) {
					return header.table_name === node.props.table_name;
				});
			} else {
				throw new Error("Invalid node definition");
			}
			return gauze.read(header, node.props.variables).then(function (data) {
				if (data && data.length) {
					data.forEach(function (item) {
						model.create(item._metadata.type, item._metadata.id, item.attributes);
					});
				}
				updateNode(index, {
					...node,
					props: {
						...node.props,
						type: header.name,
						data: data.map(function (item) {
							return item.attributes;
						}),
						count: data.length,
					},
				});
				setInitialized(true);
			});
		});
	}
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
	if (initialized) {
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
	} else {
		return <div>Loading</div>;
	}
}
