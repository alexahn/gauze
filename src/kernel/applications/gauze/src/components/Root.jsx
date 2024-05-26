import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

export default function Root({ gauze, model, router, route, render }) {
	const headers = model.all("HEADER");
	const systemJWT = gauze.getSystemJWT();
	const systemJWTPayload = jose.decodeJwt(systemJWT);
	const rootID = uuidv4();
	const [indexNode, setIndexNode] = useState({
		[rootID]: 0,
	});
	const [indexEdge, setIndexEdge] = useState({});
	const [indexConnection, setIndexConnection] = useState({});
	const [nodes, setNodes] = useState(function () {
		console.log("ONLY CALL ONCE");
		// structural check to make sure index property aligns with order in array
		return [
			{
				id: rootID,
				index: 0,
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
						limit: PAGINATION_PAGE_SIZE,
					},
					data: [],
					count: 0,
				},
				complete: false,
				sound: false,
				render: false,
			},
		];
	});
	const [edges, setEdges] = useState([]);
	const [connections, setConnections] = useState([]);
	/*
	edge = {
		from_node:
		from_connection:
		to_node:
		to_connection:
		component:
		props:
	}
	connection = {
		name:
		node:
		x:
		y:
		component:
		props:
	}
	*/
	const [complete, setComplete] = useState(function () {
		return nodes.every(function (node) {
			return node.complete;
		});
	});
	const [completing, setCompleting] = useState(complete);
	const [sound, setSound] = useState(function () {
		return nodes.every(function (node) {
			return node.sound;
		});
	});
	const [sounding, setSounding] = useState(sound);
	const [retry, setRetry] = useState(4);

	// note: load from local storage in the future
	// note: parse all nodes, and stitch together one graphql query
	// note: refresh the data section for all nodes on load
	// note: we don't need to wait until the query is done to present data, because we can present the data from local storage
	// note: there are four main states for nodes:
	// note:    incomplete (we don't have all the fields associated with the identifer)
	// note:    complete (we have all the fields associated with the identifier)
	// note:    unsound (the fields we have are not the latest values)
	// note:    sound (the fields we have are the latest values)
	// note: we can only proceed with rendering once every node is complete
	// note: we can proceed with soundness after rendering

	function getNodeHeader(headers, node) {
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
		return header;
	}

	// first stage for completeness
	if (!complete && !completing && 0 < retry) {
		setCompleting(true);
		return Promise.all(
			nodes
				.filter(function (node) {
					return !node.complete;
				})
				.map(function (node) {
					const header = getNodeHeader(headers, node);
					const transactions = [
						function () {
							return gauze.read(header, node.props.variables).then(function (data) {
								if (data && data.length) {
									data.forEach(function (item) {
										model.create(item._metadata.type, item._metadata.id, item.attributes);
									});
								}
								return data;
							});
						},
						function () {
							return gauze.count(header, {
								source: node.props.variables.source,
								count: {
									[header.primary_key]: header.primary_key,
								},
								where: node.props.variables.where,
							});
						},
					];
					return Promise.all(
						transactions.map(function (t) {
							return t();
						}),
					).then(function (results) {
						const data = results[0].map(function (item) {
							return item.attributes;
						});
						const count = results[1][0].count;
						updateNode(node.index, {
							...node,
							props: {
								...node.props,
								type: header.name,
								data: data,
								count: count,
							},
							complete: true,
						});
					});
				}),
		)
			.then(function (results) {
				setComplete(true);
				setCompleting(false);
			})
			.catch(function (err) {
				setCompleting(false);
				setRetry(retry - 1);
			});
	}

	// second stage for soundness
	if (complete && !sound && !sounding && 0 < retry) {
		setSounding(true);
		return Promise.all(
			nodes
				.filter(function (node) {
					return !node.sound;
				})
				.map(function (node) {
					const header = getNodeHeader(headers, node);
					const transactions = [
						function () {
							return gauze.read(header, node.props.variables).then(function (data) {
								if (data && data.length) {
									data.forEach(function (item) {
										model.create(item._metadata.type, item._metadata.id, item.attributes);
									});
								}
								return data;
							});
						},
						function () {
							return gauze.count(header, {
								count: {
									[header.primary_key]: header.primary_key,
								},
								where: node.props.variables.where,
							});
						},
					];
					return Promise.all(
						transactions.map(function (t) {
							return t();
						}),
					).then(function (results) {
						const data = results[0].map(function (item) {
							return item.attributes;
						});
						const count = results[1][0].count;
						updateNode(node.index, {
							...node,
							props: {
								...node.props,
								type: header.name,
								data: data,
								count: count,
							},
							complete: true,
						});
					});
				}),
		)
			.then(function (results) {
				setSound(true);
				setSounding(false);
			})
			.catch(function (err) {
				setSounding(false);
				setRetry(retry - 1);
			});
	}

	function initializeNode(index, node) {
		const { width, height } = node;
		const updated = [...nodes];
		// this node has already rendered before, so we only need to update the width and height
		if (node.render) {
			updated[index] = {
				...node,
				width,
				height,
			};
		} else {
			const x = 0 < index ? updated[index - 1].x + updated[index - 1].width * updated[index - 1].z + 10 * updated[index - 1].z : 0;
			const y = 0 < index ? updated[index - 1].y + updated[index - 1].height * updated[index - 1].z + 10 * updated[index - 1].z : 0;
			updated[index] = {
				...node,
				width,
				height,
				x,
				y,
				z: updated[0].z,
				render: true,
			};
		}
		setNodes(updated);
	}
	function createNode(node) {
		const updated = [...nodes];
		node.index = nodes.length;
		updated.push(node);
		setNodes(updated);
		setComplete(false);
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
	function createEdge(edge) {
		const updated = [...edges];
		edge.index = edges.length;
		updated.push(edge);
		setEdges(updated);
	}
	function updateEdge(index, edge) {
		const updated = [...edges];
		updated[index] = {
			...updated[index],
			edge,
		};
		setNodes(updated);
	}
	function deleteEdge(index) {
		const updated = [...edges];
		updated.splice(index, 1);
		setNodes(updated);
	}
	function createConnection(connection) {
		const updated = [...connections];
		connection.index = connections.length;
		updated.push(connection);
		setConnections(updated);
	}
	function updateConnection(index, connection) {
		const updated = [...connections];
		updated[index] = {
			...updated[index],
			connection,
		};
		setNodes(updated);
	}
	function deleteConnection(index) {
		const updated = [...connections];
		updated.splice(index, 1);
		setNodes(updated);
	}
	const initializeStart = nodes.findIndex(function (node) {
		return node.complete && node.width === null && node.height === null;
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
