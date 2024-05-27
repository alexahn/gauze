import React from "react";
import { useState } from "react";

import { PAGINATION_PAGE_SIZE } from "./../constants.js";

import Graph from "./Graph.jsx";
import Node from "./Node.jsx";
import Table from "./Table.jsx";

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

export default function Root({ gauze, model, router, route, render, rootID }) {
	const headers = model.all("HEADER");
	const systemJWT = gauze.getSystemJWT();
	const systemJWTPayload = jose.decodeJwt(systemJWT);
	const agentHeader = headers.find(function (header) {
		return header.table_name === systemJWTPayload.agent_type;
	});
	const [nodes, setNodes] = useState(function () {
		console.log("ONLY CALL ONCE");
		return {
			[rootID]: {
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
					type: agentHeader.name,
					table_name: agentHeader.table_name,
					primary_key: agentHeader.primary_key,
					graphql_meta_type: agentHeader.graphql_meta_type,
					fromNodeID: null,
					toNodeID: null,
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
		};
	});
	const [edges, setEdges] = useState({});
	const [connections, setConnections] = useState({});
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
		return Object.values(nodes).every(function (node) {
			return node.complete;
		});
	});
	const [completing, setCompleting] = useState(complete);
	const [sound, setSound] = useState(function () {
		return Object.values(nodes).every(function (node) {
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
	function syncNodeEdges(node, data) {
		const nodes = {};
		const rawEdges = [];
		const newEdges = [];
		let nodeEdges = [];
		const newConnections = [];
		let nodeConnections = [];
		const connectionsArray = Object.values(connections);
		const edgesArray = Object.values(edges);
		if (node.props.from) {
			data.forEach(function (item) {
				nodeConnections = nodeConnections.concat(
					connectionsArray.filter(function (connection) {
						const name = connection.name === "from";
						const entityID = connection.entityID === item[node.props.primary_key];
						const entityType = connection.entityType === node.props.graphql_meta_type;
						return name && entityID && entityType;
					}),
				);
				const foundFrom = connectionsArray.find(function (connection) {
					const nodeID = connection.nodeID === node.props.fromNodeID;
					const name = connection.name === "from";
					const entityID = connection.entityID === item[node.props.from._metadata.id];
					const entityType = connection.entityType === node.props.from._metadata.type;
					return nodeID && name && entityID && entityType;
				});
				const foundTo = connectionsArray.find(function (connection) {
					const nodeID = connection.nodeID === node.id;
					const name = connection.name === "to";
					const entityID = connection.entityID === item[node.props.primary_key];
					const entityType = connection.entityType === node.props.type;
					return nodeID && name && entityID && entityType;
				});
				const edge = {};
				if (foundFrom) {
					edge.from = foundFrom;
					nodeConnections.push(foundFrom);
				} else {
					const newFrom = {
						id: uuidv4(),
						nodeID: node.props.fromNodeID,
						name: "from",
						entityID: node.props.from._metadata.id,
						entityType: node.props.from._metadata.type,
						x: null,
						y: null,
					};
					edge.from = newFrom;
					newConnections.push(newFrom);
					nodeConnections.push(newFrom);
				}
				if (foundTo) {
					edge.to = foundTo;
					nodeConnections.push(foundTo);
				} else {
					const toFrom = {
						id: uuidv4(),
						nodeID: node.id,
						name: "to",
						entityID: item[node.props.primary_key],
						entityType: node.props.graphql_meta_type,
						x: null,
						y: null,
					};
					edge.to = toFrom;
					newConnections.push(toFrom);
					nodeConnections.push(toFrom);
				}
				const foundEdge = edgesArray.find(function (e) {
					const fromNodeID = e.fromNodeID === node.props.fromNodeID;
					const fromConnectionID = e.fromConnectionID === e.from.id;
					const toNodeID = e.toNodeID === node.id;
					const toConnectionID = e.toConnectionID === e.to.id;
					return fromNodeID && fromConnectionID && toNodeID && toConnectionID;
				});
				if (foundEdge) {
					nodeEdges.push(foundEdge);
				} else {
					const newEdge = {
						id: uuidv4(),
						fromNodeID: node.props.fromNodeID,
						fromConnectionID: edge.from.id,
						toNodeID: node.id,
						toConnectionID: edge.to.id,
					};
					newEdges.push(newEdge);
					nodeEdges.push(newEdge);
				}
				rawEdges.push(edge);
			});
		} else if (node.props.to) {
			// ensure connections exist
			data.forEach(function (item) {
				nodeConnections = nodeConnections.concat(
					connectionsArray.filter(function (connection) {
						const name = connection.name === "to";
						const entityID = connection.entityID === item[node.props.primary_key];
						const entityType = connection.entityType === node.props.graphql_meta_type;
						return name && entityID && entityType;
					}),
				);
				const foundFrom = connectionsArray.find(function (connection) {
					const nodeID = connection.nodeID === node.props.fromNodeID;
					const name = connection.name === "to";
					const entityID = connection.entityID === item[node.props.to._metadata.id];
					const entityType = connection.entityType === node.props.to._metadata.type;
					return nodeID && name && entityID && entityType;
				});
				const foundTo = connectionsArray.find(function (connection) {
					const nodeID = connection.nodeID === node.id;
					const name = connection.name === "from";
					const entityID = connection.entityID === item[node.props.primary_key];
					const entityType = connection.entityType === node.props.type;
					return nodeID && name && entityID && entityType;
				});
				const edge = {};
				if (foundFrom) {
					edge.from = foundFrom;
					nodeConnections.push(foundFrom);
				} else {
					const newFrom = {
						id: uuidv4(),
						nodeID: node.props.fromNodeID,
						name: "from",
						entityID: item[node.props.primary_key],
						entityType: node.props.graphql_meta_type,
						x: null,
						y: null,
					};
					edge.from = newFrom;
					newConnections.push(newFrom);
					nodeConnections.push(newFrom);
				}
				if (foundTo) {
					edge.to = foundTo;
					nodeConnections.push(foundTo);
				} else {
					const toFrom = {
						id: uuidv4(),
						nodeID: node.id,
						name: "to",
						entityID: node.props.to._metadata.id,
						entityType: node.props.to._metadata.type,
						x: null,
						y: null,
					};
					edge.to = toFrom;
					newConnections.push(toFrom);
					nodeConnections.push(toFrom);
				}
				const foundEdge = edgesArray.find(function (e) {
					const fromNodeID = e.fromNodeID === node.id;
					const fromConnectionID = e.fromConnectionID === e.from.id;
					const toNodeID = e.toNodeID === node.props.toNodeID;
					const toConnectionID = e.toConnectionID === e.to.id;
					return fromNodeID && fromConnectionID && toNodeID && toConnectionID;
				});
				if (foundEdge) {
					nodeEdges.push(foundEdge);
				} else {
					const newEdge = {
						id: uuidv4(),
						fromNodeID: node.id,
						fromConnectionID: edge.from.id,
						toNodeID: node.props.toNodeID,
						toConnectionID: edge.to.id,
					};
					newEdges.push(newEdge);
					nodeEdges.push(newEdge);
				}
				rawEdges.push(edge);
			});
		} else {
		}
		nodes[node.id] = {
			connections: nodeConnections.map(function (connection) {
				return connection.id;
			}),
		};
		return {
			nodes: nodes,
			nodeConnections: nodeConnections,
			newConnections: newConnections,
			nodeEdges: nodeEdges,
			newEdges: newEdges,
		};
	}
	function syncNodesEdges(results) {
		const mapped = results.map(function (result) {
			// node, header, data, count
			return syncNodeEdges(result.node, result.data);
		});
		// stitch
		const nodes = {};
		let nodeConnections = [];
		let newConnections = [];
		let nodeEdges = [];
		let newEdges = [];
		mapped.forEach(function (synced) {
			Object.keys(synced.nodes).forEach(function (key) {
				nodes[key] = synced.nodes[key];
			});
			nodeConnections = nodeConnections.concat(synced.nodeConnections);
			newConnections = newConnections.concat(synced.newConnections);
			nodeEdges = nodeEdges.concat(synced.nodeEdges);
			newEdges = newEdges.concat(synced.newEdges);
		});
		return {
			nodes,
			nodeConnections,
			newConnections,
			nodeEdges,
			newEdges,
		};
	}
	// todo: move completeness and soundness stages to route handler
	// first stage for completeness
	if (!complete && !completing && 0 < retry) {
		setCompleting(true);
		return Promise.all(
			Object.values(nodes)
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
						return {
							node: node,
							header: header,
							data: data,
							count: count,
						};
						/*
						updateNodes([
							{
								...node,
								props: {
									...node.props,
									type: header.name,
									data: data,
									count: count,
								},
								complete: true,
							},
						]);
						*/
					});
				}),
		)
			.then(function (results) {
				const synced = syncNodesEdges(results);
				console.log('synced', synced)
				createConnections(synced.newConnections);
				createEdges(synced.newEdges);
				updateNodes(
					results.map(function (result) {
						return {
							...result.node,
							props: {
								...result.node.props,
								data: result.data,
								count: result.count,
								connectionIDs: synced.nodes[result.node.id].connections,
							},
							complete: true,
						};
					}),
				);
				setComplete(true);
				setCompleting(false);
			})
			.catch(function (err) {
				console.error(err);
				setCompleting(false);
				setRetry(retry - 1);
			});
	}

	// second stage for soundness
	if (complete && !sound && !sounding && 0 < retry) {
		setSounding(true);
		return Promise.all(
			Object.values(nodes)
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
						return {
							node: node,
							header: header,
							data: data,
							count: count,
						};
						/*
						updateNodes([
							{
								...node,
								props: {
									...node.props,
									type: header.name,
									data: data,
									count: count,
								},
								sound: true,
							},
						]);
						*/
					});
				}),
		)
			.then(function (results) {
				const synced = syncNodesEdges(results);
				createConnections(synced.newConnections);
				createEdges(synced.newEdges);
				updateNodes(
					results.map(function (result) {
						return {
							...result.node,
							props: {
								...result.node.props,
								data: result.data,
								count: result.count,
								connectionIDs: synced.nodes[result.node.id].connections,
							},
							sound: true,
						};
					}),
				);
				setSound(true);
				setSounding(false);
			})
			.catch(function (err) {
				console.error(err);
				setSounding(false);
				setRetry(retry - 1);
			});
	}

	function initializeNodes(candidates) {
		const staged = { ...nodes };
		const nodesArray = Object.values(staged);
		candidates.forEach(function (node) {
			const { width, height } = node;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			if (node.render) {
				staged[node.id] = node;
			} else {
				// get max x in nodes
				// get max y in nodes
				const zMax = nodesArray.reduce(function (max, item) {
					const candidate = item.z;
					if (item.id === rootID && max <= candidate) {
						return candidate;
					} else if (item.render && max <= candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const xMax = nodesArray.reduce(function (max, item) {
					const candidate = item.x + item.width * item.z;
					if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const yMax = nodesArray.reduce(function (max, item) {
					const candidate = item.y + item.height * item.z;
					if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const padding = 10;
				const x = xMax + padding * zMax;
				const y = yMax + padding * zMax;
				const z = zMax;
				staged[node.id] = {
					...node,
					x,
					y,
					z,
					render: true,
				};
			}
		});
		setNodes(staged);
	}
	// node methods
	function readNodes(candidates) {
		return candidates.map(function (node) {
			return nodes[node.id];
		});
	}
	function createNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		setNodes(staging);
		setComplete(false);
	}
	function updateNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		setNodes(staging);
	}
	function deleteNodes(candidates) {
		const staging = { ...nodes };
		candidates.forEach(function (node) {
			delete staging[node.id];
		});
		setNodes(staging);
	}
	// edge methods
	function readEdges(candidates) {
		return candidates.map(function (edge) {
			return edges[edge.id];
		});
	}
	function createEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		setEdges(staging);
	}
	function updateEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		setEdges(staging);
	}
	function deleteEdges(candidates) {
		const staging = { ...edges };
		candidates.forEach(function (edge) {
			delete staging[edge.id];
		});
		setEdges(staging);
	}
	// connection methods
	function initializeConnections(candidates) {
		const staged = { ...connections };
		const connectionsArray = Object.values(staged);
		candidates.forEach(function (connection) {
			const { width, height } = node;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			staged[connection.id] = connection;
		});
		setConnections(staged);
	}
	function readConnections(candidates) {
		return candidates.map(function (connection) {
			return connections[connection.id];
		});
	}
	function createConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		setConnections(staging);
	}
	function updateConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		setConnections(staging);
	}
	function deleteConnections(candidates) {
		const staging = { ...connections };
		candidates.forEach(function (connection) {
			delete staging[connection.id];
		});
		setConnections(staging);
	}

	const initializeStart = Object.values(nodes).find(function (node) {
		return node.complete && node.width === null && node.height === null;
	});
	if (initializeStart) {
		setTimeout(function () {
			render.create(route.name, "NODE", initializeStart.id, true);
		}, 0);
	}
	return (
		<Graph
			key={"graph"}
			route={route}
			render={render}
			nodes={nodes}
			initializeNodes={initializeNodes}
			createNodes={createNodes}
			readNodes={readNodes}
			updateNodes={updateNodes}
			deleteNodes={deleteNodes}
			syncNodeEdges={syncNodeEdges}
			edges={edges}
			createEdges={createEdges}
			readEdges={readEdges}
			updateEdges={updateEdges}
			deleteEdges={deleteEdges}
			connections={connections}
			createConnections={createConnections}
			readConnections={readConnections}
			updateConnections={updateConnections}
			deleteConnections={deleteConnections}
		/>
	);
}
