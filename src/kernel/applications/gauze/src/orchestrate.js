// this file holds functions that act as high level actions/methods that work across multiple services

import { PAGINATION_PAGE_SIZE } from "./constants.js";

import { v4 as uuidv4 } from "uuid";

function createNode(services, header) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const candidate = {
			id: uuidv4(),
			root: true,
			index: 0,
			oldX: 0,
			oldY: 0,
			x: 0,
			y: 0,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: 0,
				type: header.name,
				table_name: header.table_name,
				primary_key: header.primary_key,
				graphql_meta_type: header.graphql_meta_type,
				fromNodeID: null,
				toNodeID: null,
				from: null,
				to: null,
				fields: header.fields,
				variables: {
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: header.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: false,
			sound: false,
			render: false,
		};
		return graph.createNode(candidate);
	});
}

function createSpace(services, header, spaceID) {
	const { gauze, model, router, graph } = services;
	return import("./components/Table.jsx").then(function (table) {
		const node = {
			id: uuidv4(),
			root: true,
			index: 0,
			oldX: 0,
			oldY: 0,
			x: 0,
			y: 0,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: 0,
				type: header.name,
				table_name: header.table_name,
				primary_key: header.primary_key,
				graphql_meta_type: header.graphql_meta_type,
				fromNodeID: null,
				toNodeID: null,
				from: null,
				to: null,
				fields: header.fields,
				variables: {
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: header.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: false,
			sound: false,
			render: false,
		};
		const createdSpace = graph.createSpace(header.name, spaceID, {});
		graph.createSpaceNodes(header.name, spaceID, [node]);
	});
}

function reloadSpace(services, agentHeader, spaceID) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
		return Promise.all(
			activeNodes.values.map(function (node) {
				const header = model.read("HEADER", node.props.type);
				const transactions = [
					function () {
						// todo: squash this into one http call by using named queries (use the node id as the name)
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
				});
			}),
		)
			.then(function (results) {
				// update data and count
				graph.updateSpaceNodes(
					agentHeader.name,
					spaceID,
					results.map(function (result) {
						return {
							...result.node,
							props: {
								...result.node.props,
								data: result.data,
								count: result.count,
								connectionIDs: [],
							},
							complete: true,
						};
					}),
				);
				const synced = graph.syncNodesEdges(results);
				const newConnections = synced.newConnections.map(function (connection) {
					return {
						...connection,
						component: relationship.default,
						props: {
							gauze: gauze,
							model: model,
							router: router,
							graph: graph,
						},
					};
				});
				const newEdges = synced.newEdges;
				graph.createSpaceConnections(agentHeader.name, spaceID, newConnections);
				graph.createSpaceEdges(agentHeader.name, spaceID, newEdges);
				const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
				const connectedNodes = Object.keys(syncedConnections).map(function (id) {
					return {
						...graph.nodes[id],
						props: {
							...graph.nodes[id].props,
							connectionIDs: syncedConnections[id].connections,
						},
					};
				});
				graph.updateSpaceNodes(agentHeader.name, spaceID, connectedNodes);
				// reinitialize
				graph.updateSpaceNodes(
					agentHeader.name,
					spaceID,
					graph.spaceActiveNodes(agentHeader.name, spaceID).values.map(function (node) {
						return {
							...node,
							oldWidth: node.width,
							oldHeight: node.height,
							width: null,
							height: null,
						};
					}),
				);
				// reinitialize connections
				graph.updateSpaceConnections(
					agentHeader.name,
					spaceID,
					graph.spaceActiveConnections(agentHeader.name, spaceID).values.map(function (connection) {
						return {
							...connection,
							x: null,
							y: null,
						};
					}),
				);
				return results;
			})
			.then(function () {
				return reloadSpaceRelationships(services, agentHeader, spaceID);
			});
	});
}

function reloadSpaceRelationships(services, agentHeader, spaceID) {
	return import("./components/Relationship.jsx")
		.then(function (component) {
			const { gauze, model, router, graph } = services;
			const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
			const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
			const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
			const entityFromIDs = {};
			const entityToIDs = {};
			activeEdges.values.forEach(function (edge) {
				const fromConnection = activeConnections.object[edge.fromConnectionID];
				const toConnection = activeConnections.object[edge.toConnectionID];
				if (entityFromIDs[fromConnection.entityType]) {
					entityFromIDs[fromConnection.entityType].push(fromConnection.entityID);
				} else {
					entityFromIDs[fromConnection.entityType] = [fromConnection.entityID];
				}
				if (entityToIDs[toConnection.entityType]) {
					entityToIDs[toConnection.entityType].push(toConnection.entityID);
				} else {
					entityToIDs[toConnection.entityType] = [toConnection.entityID];
				}
			});
			const activeEntityToNodeMap = {};
			const activeEntityIDs = activeNodes.values
				.map(function (node) {
					return node.props.data.map(function (entity) {
						const entityID = entity[node.props.primary_key];
						if (activeEntityToNodeMap[entityID]) {
							activeEntityToNodeMap[entityID].push(node);
						} else {
							activeEntityToNodeMap[entityID] = [node];
						}
						return entityID;
					});
				})
				.flat();
			// there should be at least one id if we fetched the root
			const headers = model.all("HEADER");
			const relationshipHeader = headers.find(function (header) {
				return header.name === "relationship";
			});
			// do a count query to get the total number of results
			// paginate and collect all results
			const maxLimit = 1024; // max size should align with server limit
			const whereIn = {
				gauze__relationship__from_id: activeEntityIDs,
				gauze__relationship__to_id: activeEntityIDs,
			};
			const countParameters = {
				where_in: whereIn,
			};
			return gauze.count(relationshipHeader, countParameters).then(function (data) {
				// create buckets of size maxLimit
				const bucketsCount = Math.ceil(data[0].count / maxLimit);
				const buckets = [];
				for (var i = 0; i < bucketsCount; i += 1) {
					buckets.push({
						where_in: whereIn,
						offset: i * maxLimit,
						limit: maxLimit,
					});
				}
				return Promise.all(
					buckets.map(function (bucket) {
						return gauze.read(relationshipHeader, bucket);
					}),
				).then(function (results) {
					// iterate over results
					results.forEach(function (relationships) {
						// check every relationship to see if an edge exists
						// if it doesn't, create the connections
						// synchronize at end
						relationships
							.map(function (r) {
								return r.attributes;
							})
							.forEach(function (relationship) {
								const fromHeader = headers.find(function (header) {
									return header.table_name === relationship.gauze__relationship__from_type;
								});
								const toHeader = headers.find(function (header) {
									return header.table_name === relationship.gauze__relationship__to_type;
								});
								activeEntityToNodeMap[relationship.gauze__relationship__from_id].forEach(function (fromNode) {
									activeEntityToNodeMap[relationship.gauze__relationship__to_id].forEach(function (toNode) {
										const edge = activeEdges.values.find(function (edge) {
											const fromConnection = activeConnections.object[edge.fromConnectionID];
											const toConnection = activeConnections.object[edge.toConnectionID];
											const fromNodeID = fromConnection.nodeID === fromNode.id;
											const fromEntityID = fromConnection.entityID === relationship.gauze__relationship__from_id;
											const fromEntityType = fromConnection.entityType === fromHeader.graphql_meta_type;
											const toNodeID = toConnection.nodeID === toNode.id;
											const toEntityID = toConnection.entityID === relationship.gauze__relationship__to_id;
											const toEntityType = toConnection.entityType === toHeader.graphql_meta_type;
											/*
											if (!fromNodeID) {
												console.log('fromNodeID', fromNodeID)
											}
											if (!fromEntityID) {
												console.log('fromEntityID', fromEntityID)
											}
											if (!fromEntityType) {
												console.log('fromEntityType', fromEntityType)
											}
											if (!toNodeID) {
												console.log('toNodeID', toNodeID)
											}
											if (!toEntityID) {
												console.log('toEntityID', toEntityID, toConnection, relationship.gauze__relationship__to_id)
											}
											if (!toEntityType) {
												console.log('toEntityType', toEntityType)
											}
											*/
											return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
										});
										if (edge) {
											console.log("edge found!");
										} else {
											console.log("edge not found!");
											// loop through activeNodeEntityMap using from
											// loop through activeNodeEntityMap using to
											const fromConnectionID = uuidv4();
											const fromConnection = {
												id: fromConnectionID,
												name: "from",
												nodeID: fromNode.id,
												entityID: relationship.gauze__relationship__from_id,
												entityType: fromHeader.graphql_meta_type,
												x: null,
												y: null,
												z: 1,
												component: component.default,
												props: {
													gauze: gauze,
													model: model,
													router: router,
													graph: graph,
												},
											};
											const toConnectionID = uuidv4();
											const toConnection = {
												id: toConnectionID,
												name: "to",
												nodeID: toNode.id,
												entityID: relationship.gauze__relationship__to_id,
												entityType: toHeader.graphql_meta_type,
												x: null,
												y: null,
												z: 1,
												component: component.default,
												props: {
													gauze: gauze,
													model: model,
													router: router,
													graph: graph,
												},
											};
											const edgeID = uuidv4();
											const edge = {
												id: edgeID,
												fromNodeID: fromNode.id,
												fromConnectionID: fromConnectionID,
												toNodeID: toNode.id,
												toConnectionID: toConnectionID,
											};
											graph.createSpaceConnections(agentHeader.name, spaceID, [fromConnection, toConnection]);
											graph.createSpaceEdges(agentHeader.name, spaceID, [edge]);
										}
									});
								});
							});
						return synchronizeSpace(services, agentHeader, spaceID, null);
					});
				});
			});
		})
		.catch(function (err) {
			console.error(err);
			throw err;
		});
}

function synchronizeSpace(services, agentHeader, spaceID, targetNode, callback) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		if (targetNode) {
			const synced = graph.syncNodeEdges(targetNode, targetNode.props.data);
			console.log("synced", synced);
			// create new edges, connections, and nodes using service
			const newConnections = synced.newConnections.map(function (connection) {
				return {
					...connection,
					component: relationship.default,
					props: {
						gauze: gauze,
						model: model,
						router: router,
						graph: graph,
					},
				};
			});
			const newEdges = synced.newEdges;
			graph.createSpaceConnections(agentHeader.name, spaceID, newConnections);
			graph.createSpaceEdges(agentHeader.name, spaceID, newEdges);
			callback(targetNode);
		}
		// syncedConnections is the total set of connections for all nodes
		const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
		// wipe connections for all active nodes
		graph.updateSpaceNodes(
			agentHeader.name,
			spaceID,
			graph.spaceActiveNodes(agentHeader.name, spaceID).values.map(function (node) {
				return {
					...node,
					props: {
						...node.props,
						connectionIDs: [],
					},
				};
			}),
		);
		// apply synced connections for all nodes
		const connectedNodes = Object.keys(syncedConnections).map(function (id) {
			return {
				...graph.selectNode(id),
				props: {
					...graph.selectNode(id).props,
					connectionIDs: syncedConnections[id].connections,
				},
			};
		});
		graph.updateSpaceNodes(agentHeader.name, spaceID, connectedNodes);
		// reinitialize nodes
		graph.updateSpaceNodes(
			agentHeader.name,
			spaceID,
			graph.spaceActiveNodes(agentHeader.name, spaceID).values.map(function (node) {
				return {
					...node,
					oldWidth: node.width,
					oldHeight: node.height,
					width: null,
					height: null,
				};
			}),
		);
		// reinitialize connections
		graph.updateSpaceConnections(
			agentHeader.name,
			spaceID,
			graph.spaceActiveConnections(agentHeader.name, spaceID).values.map(function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
	});
}

function createSpaceRelationship(services, agentHeader, spaceID, relationship) {
	return import("./components/Relationship.jsx").then(function (component) {
		const { gauze, model, router, graph } = services;
		const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
		const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
		const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
		const activeEntityToNodeMap = {};
		const activeEntityIDs = activeNodes.values
			.map(function (node) {
				return node.props.data.map(function (entity) {
					const entityID = entity[node.props.primary_key];
					if (activeEntityToNodeMap[entityID]) {
						activeEntityToNodeMap[entityID].push(node);
					} else {
						activeEntityToNodeMap[entityID] = [node];
					}
					return entityID;
				});
			})
			.flat();
		const edge = activeEdges.values.find(function (edge) {
			const fromConnection = activeConnections.object[edge.fromConnectionID];
			const toConnection = activeConnections.object[edge.toConnectionID];
			const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
			const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
			const toEntityID = toConnection.entityID === relationship.toEntityID;
			const toEntityType = toConnection.entityType === relationship.toEntityType;
			return fromEntityID && fromEntityType && toEntityID && toEntityType;
		});
		if (edge) {
			console.log("edge", edge);
		} else {
			const headers = model.all("HEADER");
			const relationshipHeader = headers.find(function (header) {
				return header.name === "relationship";
			});
			const fromHeader = headers.find(function (header) {
				return header.graphql_meta_type === relationship.fromEntityType;
			});
			const toHeader = headers.find(function (header) {
				return header.graphql_meta_type === relationship.toEntityType;
			});
			const attributes = {
				gauze__relationship__from_id: relationship.fromEntityID,
				gauze__relationship__from_type: fromHeader.table_name,
				gauze__relationship__to_id: relationship.toEntityID,
				gauze__relationship__to_type: toHeader.table_name,
			};
			return gauze
				.create(relationshipHeader, {
					attributes: attributes,
				})
				.then(function (data) {
					// create a relationship, create the connections, create the edge
					activeEntityToNodeMap[relationship.fromEntityID].forEach(function (fromNode) {
						activeEntityToNodeMap[relationship.toEntityID].forEach(function (toNode) {
							const edge = activeEdges.values.find(function (edge) {
								const fromConnection = activeConnections.object[edge.fromConnectionID];
								const toConnection = activeConnections.object[edge.toConnectionID];
								const fromNodeID = fromConnection.nodeID === fromNode.id;
								const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
								const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
								const toNodeID = toConnection.nodeID === toNode.id;
								const toEntityID = toConnection.entityID === relationship.toEntityID;
								const toEntityType = toConnection.entityType === relationship.toEntityType;
								return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
							});
							if (edge) {
								console.log("edge", edge);
							} else {
								//alert(JSON.stringify(relationship, null, 4));
								const fromConnectionID = uuidv4();
								const fromConnection = {
									id: fromConnectionID,
									name: "from",
									nodeID: fromNode.id,
									entityID: relationship.fromEntityID,
									entityType: relationship.fromEntityType,
									x: null,
									y: null,
									z: 1,
									component: component.default,
									props: {
										gauze: gauze,
										model: model,
										router: router,
										graph: graph,
									},
								};
								const toConnectionID = uuidv4();
								const toConnection = {
									id: toConnectionID,
									name: "to",
									nodeID: toNode.id,
									entityID: relationship.toEntityID,
									entityType: relationship.toEntityType,
									x: null,
									y: null,
									z: 1,
									component: component.default,
									props: {
										gauze: gauze,
										model: model,
										router: router,
										graph: graph,
									},
								};
								const edgeID = uuidv4();
								const edge = {
									id: edgeID,
									fromNodeID: fromNode.id,
									fromConnectionID: fromConnectionID,
									toNodeID: toNode.id,
									toConnectionID: toConnectionID,
								};
								graph.createSpaceConnections(agentHeader.name, spaceID, [fromConnection, toConnection]);
								graph.createSpaceEdges(agentHeader.name, spaceID, [edge]);
							}
						});
					});
					return synchronizeSpace(services, agentHeader, spaceID, null);
				});
		}
	});
}

function deleteSpaceRelationship(services, agentHeader, spaceID, relationship) {
	const { gauze, model, graph } = services;
	const activeNodes = graph.spaceActiveNodes(agentHeader.name, spaceID);
	const activeEdges = graph.spaceActiveEdges(agentHeader.name, spaceID);
	const activeConnections = graph.spaceActiveConnections(agentHeader.name, spaceID);
	const headers = model.all("HEADER");
	const activeEntityToNodeMap = {};
	const activeEntityIDs = activeNodes.values
		.map(function (node) {
			return node.props.data.map(function (entity) {
				const entityID = entity[node.props.primary_key];
				if (activeEntityToNodeMap[entityID]) {
					activeEntityToNodeMap[entityID].push(node);
				} else {
					activeEntityToNodeMap[entityID] = [node];
				}
				return entityID;
			});
		})
		.flat();
	const relationshipHeader = headers.find(function (header) {
		return header.name === "relationship";
	});
	const fromHeader = headers.find(function (header) {
		return header.graphql_meta_type === relationship.fromEntityType;
	});
	const toHeader = headers.find(function (header) {
		return header.graphql_meta_type === relationship.toEntityType;
	});
	const attributes = {
		gauze__relationship__from_id: relationship.fromEntityID,
		gauze__relationship__from_type: fromHeader.table_name,
		gauze__relationship__to_id: relationship.toEntityID,
		gauze__relationship__to_type: toHeader.table_name,
	};
	return gauze
		.read(relationshipHeader, {
			where: attributes,
		})
		.then(function (read) {
			if (read && read.length) {
				const found = read[0];
				const where = {
					[relationshipHeader.primary_key]: found.attributes[relationshipHeader.primary_key],
				};
				return gauze
					.delete(relationshipHeader, {
						where: where,
					})
					.then(function (deleted) {
						activeEntityToNodeMap[relationship.fromEntityID].forEach(function (fromNode) {
							activeEntityToNodeMap[relationship.toEntityID].forEach(function (toNode) {
								const edge = activeEdges.values.find(function (edge) {
									const fromConnection = activeConnections.object[edge.fromConnectionID];
									const toConnection = activeConnections.object[edge.toConnectionID];
									const fromNodeID = fromConnection.nodeID === fromNode.id;
									const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
									const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
									const toNodeID = toConnection.nodeID === toNode.id;
									const toEntityID = toConnection.entityID === relationship.toEntityID;
									const toEntityType = toConnection.entityType === relationship.toEntityType;
									return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
								});
								if (edge) {
									// delete the connections and then delete the edge and then synchronize
									const fromConnection = activeConnections.object[edge.fromConnectionID];
									const toConnection = activeConnections.object[edge.toConnectionID];
									graph.deleteSpaceConnections(agentHeader.name, spaceID, [fromConnection, toConnection]);
									graph.deleteSpaceEdges(agentHeader.name, spaceID, [edge]);
									return synchronizeSpace(services, agentHeader, spaceID, null);
								}
							});
						});
					});
			}
		});
}

function traverseSpace(services, agentHeader, spaceID, targetHeader, targetNode) {
	const { gauze, model, graph } = services;
	return read(
		{
			gauze,
			model,
		},
		targetHeader,
		targetNode.props.variables,
	).then(function (results) {
		const data = results[0].map(function (item) {
			return item.attributes;
		});
		const count = results[1][0].count;
		targetNode.props.data = data;
		targetNode.props.count = count;
		return synchronizeSpace(services, agentHeader, spaceID, targetNode, function (targetNode) {
			graph.createSpaceNodes(agentHeader.name, spaceID, [targetNode]);
		}).then(function () {
			return reloadSpaceRelationships(services, agentHeader, spaceID);
		});
	});
}

function traverseSpaceTo(services, agentHeader, spaceID, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverseTo", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "to",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: node.props.depth + 1,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: source,
				fromNodeID: node.id,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverseSpace(services, agentHeader, spaceID, targetHeader, targetNode);
	});
}

function traverseSpaceFrom(services, agentHeader, spaceID, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "from",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: node.props.depth - 1,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: source,
				toNodeID: node.id,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverseSpace(services, agentHeader, spaceID, targetHeader, targetNode);
	});
}

function traverseSpaceRoot(services, agentHeader, spaceID, where, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", where, targetType);
		console.log("targetHeader", targetHeader);
		const targetNode = {
			id: uuidv4(),
			workspace: agentHeader.name,
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: 0,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					where: where,
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverseSpace(services, agentHeader, spaceID, targetHeader, targetNode);
	});
}

function read(services, header, variables) {
	const { gauze, model } = services;
	const transactions = [
		function () {
			return gauze.read(header, variables).then(function (data) {
				data.forEach(function (item) {
					model.create(item._metadata.type, item._metadata.id, item.attributes);
				});
				return data;
			});
		},
		function () {
			const countVariables = {
				source: variables.source,
				count: {
					[header.primary_key]: header.primary_key,
				},
				where: variables.where,
			};
			return gauze.count(header, countVariables);
		},
	];
	return Promise.all(
		transactions.map(function (f) {
			return f();
		}),
	);
}

function synchronize(services, agentHeader, targetNode, callback) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		if (targetNode) {
			const synced = graph.syncNodeEdges(targetNode, targetNode.props.data);
			console.log("synced", synced);
			// create new edges, connections, and nodes using service
			const newConnections = synced.newConnections.map(function (connection) {
				return {
					...connection,
					component: relationship.default,
					props: {
						gauze: gauze,
						model: model,
						router: router,
						graph: graph,
					},
				};
			});
			const newEdges = synced.newEdges;
			graph.createConnections(newConnections);
			graph.createEdges(newEdges);
			callback(targetNode);
		}
		// syncedConnections is the total set of connections for all nodes
		const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
		// wipe connections for all active nodes
		graph.updateNodes(
			graph.activeNodes(agentHeader.name).values.map(function (node) {
				return {
					...node,
					props: {
						...node.props,
						connectionIDs: [],
					},
				};
			}),
		);
		// apply synced connections for all nodes
		const connectedNodes = Object.keys(syncedConnections).map(function (id) {
			return {
				...graph.selectNode(id),
				props: {
					...graph.selectNode(id).props,
					connectionIDs: syncedConnections[id].connections,
				},
			};
		});
		graph.updateNodes(connectedNodes);
		// reinitialize nodes
		graph.updateNodes(
			graph.activeNodes(agentHeader.name).values.map(function (node) {
				return {
					...node,
					oldWidth: node.width,
					oldHeight: node.height,
					width: null,
					height: null,
				};
			}),
		);
		// reinitialize connections
		graph.updateConnections(
			graph.activeConnections(agentHeader.name).values.map(function (connection) {
				return {
					...connection,
					x: null,
					y: null,
				};
			}),
		);
	});
}

function traverse(services, agentHeader, targetHeader, targetNode) {
	const { gauze, model, graph } = services;
	return read(
		{
			gauze,
			model,
		},
		targetHeader,
		targetNode.props.variables,
	).then(function (results) {
		const data = results[0].map(function (item) {
			return item.attributes;
		});
		const count = results[1][0].count;
		targetNode.props.data = data;
		targetNode.props.count = count;
		return synchronize(services, agentHeader, targetNode, function (targetNode) {
			graph.createNodes([targetNode]);
		}).then(function () {
			return reloadRelationships(services, agentHeader);
		});
	});
}

function traverseTo(services, agentHeader, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverseTo", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "to",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: node.props.depth + 1,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: source,
				fromNodeID: node.id,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function traverseFrom(services, agentHeader, node, item, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const sourceHeader = model.read("HEADER", node.props.type);
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", sourceHeader, item, targetType);
		console.log("targetHeader", targetHeader);
		const source = {
			_metadata: {
				type: sourceHeader.graphql_meta_type,
				id: item[sourceHeader.primary_key],
			},
			_direction: "from",
		};
		const targetNode = {
			id: uuidv4(),
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: node.props.depth - 1,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: source,
				toNodeID: node.id,
				fields: targetHeader.fields,
				variables: {
					source: source,
					where: {},
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function traverseRoot(services, agentHeader, where, targetType) {
	return import("./components/Table.jsx").then(function (table) {
		const { gauze, model, router, graph } = services;
		const headers = model.all("HEADER");
		const targetHeader = headers.find(function (header) {
			return header.graphql_meta_type === targetType;
		});
		console.log("traverse", where, targetType);
		console.log("targetHeader", targetHeader);
		const targetNode = {
			id: uuidv4(),
			workspace: agentHeader.name,
			oldX: 0,
			oldY: 0,
			x: null,
			y: null,
			z: 1,
			height: null,
			width: null,
			component: table.default,
			props: {
				gauze: gauze,
				model: model,
				router: router,
				graph: graph,
				depth: 0,
				type: targetHeader.name,
				table_name: targetHeader.table_name,
				primary_key: targetHeader.primary_key,
				graphql_meta_type: targetHeader.graphql_meta_type,
				from: null,
				fromNodeID: null,
				to: null,
				toNodeID: null,
				fields: targetHeader.fields,
				variables: {
					where: where,
					offset: 0,
					limit: PAGINATION_PAGE_SIZE,
					order: targetHeader.default_order,
					order_direction: "desc",
				},
				data: [],
				count: 0,
			},
			complete: true,
			sound: false,
		};
		return traverse(services, agentHeader, targetHeader, targetNode);
	});
}

function reload(services, agentHeader) {
	return import("./components/Relationship.jsx").then(function (relationship) {
		const { gauze, model, router, graph } = services;
		const activeNodes = graph.activeNodes(agentHeader.name);
		return Promise.all(
			activeNodes.values.map(function (node) {
				const header = model.read("HEADER", node.props.type);
				const transactions = [
					function () {
						// todo: squash this into one http call by using named queries (use the node id as the name)
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
				});
			}),
		)
			.then(function (results) {
				// update data and count
				graph.updateNodes(
					results.map(function (result) {
						return {
							...result.node,
							props: {
								...result.node.props,
								data: result.data,
								count: result.count,
								connectionIDs: [],
							},
							complete: true,
						};
					}),
				);
				const synced = graph.syncNodesEdges(results);
				console.log("reload synced", synced);
				const newConnections = synced.newConnections.map(function (connection) {
					return {
						...connection,
						component: relationship.default,
						props: {
							gauze: gauze,
							model: model,
							router: router,
							graph: graph,
						},
					};
				});
				const newEdges = synced.newEdges;
				graph.createConnections(newConnections);
				graph.createEdges(newEdges);
				const syncedConnections = graph.syncNodeConnections(graph.nodes, graph.edges, graph.connections);
				console.log("reload syncedConnections", syncedConnections);
				const connectedNodes = Object.keys(syncedConnections).map(function (id) {
					return {
						...graph.nodes[id],
						props: {
							...graph.nodes[id].props,
							connectionIDs: syncedConnections[id].connections,
						},
					};
				});
				graph.updateNodes(connectedNodes);
				// reinitialize
				graph.updateNodes(
					graph.activeNodes(agentHeader.name).values.map(function (node) {
						return {
							...node,
							oldWidth: node.width,
							oldHeight: node.height,
							width: null,
							height: null,
						};
					}),
				);
				// reinitialize connections
				graph.updateConnections(
					graph.activeConnections(agentHeader.name).values.map(function (connection) {
						return {
							...connection,
							x: null,
							y: null,
						};
					}),
				);
				return results;
			})
			.then(function () {
				return reloadRelationships(services, agentHeader);
			});
	});
}

function reloadRelationships(services, agentHeader) {
	return import("./components/Relationship.jsx")
		.then(function (component) {
			const { gauze, model, router, graph } = services;
			const activeNodes = graph.activeNodes(agentHeader.name);
			const activeConnections = graph.activeConnections(agentHeader.name);
			const activeEdges = graph.activeEdges(agentHeader.name);
			const activeEntityToNodeMap = {};
			const activeEntityIDs = activeNodes.values
				.map(function (node) {
					return node.props.data.map(function (entity) {
						const entityID = entity[node.props.primary_key];
						if (activeEntityToNodeMap[entityID]) {
							activeEntityToNodeMap[entityID].push(node);
						} else {
							activeEntityToNodeMap[entityID] = [node];
						}
						return entityID;
					});
				})
				.flat();
			// there should be at least one id if we fetched the root
			const headers = model.all("HEADER");
			const relationshipHeader = headers.find(function (header) {
				return header.name === "relationship";
			});
			// do a count query to get the total number of results
			// paginate and collect all results
			const maxLimit = 1024; // max size should align with server limit
			const whereIn = {
				gauze__relationship__from_id: activeEntityIDs,
				gauze__relationship__to_id: activeEntityIDs,
			};
			const countParameters = {
				where_in: whereIn,
			};
			return gauze.count(relationshipHeader, countParameters).then(function (data) {
				// create buckets of size maxLimit
				const bucketsCount = Math.ceil(data[0].count / maxLimit);
				const buckets = [];
				for (var i = 0; i < bucketsCount; i += 1) {
					buckets.push({
						where_in: whereIn,
						offset: i * maxLimit,
						limit: maxLimit,
					});
				}
				return Promise.all(
					buckets.map(function (bucket) {
						return gauze.read(relationshipHeader, bucket);
					}),
				).then(function (results) {
					// iterate over results
					results.forEach(function (relationships) {
						// check every relationship to see if an edge exists
						// if it doesn't, create the connections
						// synchronize at end
						relationships
							.map(function (r) {
								return r.attributes;
							})
							.forEach(function (relationship) {
								const fromHeader = headers.find(function (header) {
									return header.table_name === relationship.gauze__relationship__from_type;
								});
								const toHeader = headers.find(function (header) {
									return header.table_name === relationship.gauze__relationship__to_type;
								});
								activeEntityToNodeMap[relationship.gauze__relationship__from_id].forEach(function (fromNode) {
									activeEntityToNodeMap[relationship.gauze__relationship__to_id].forEach(function (toNode) {
										const edge = activeEdges.values.find(function (edge) {
											const fromConnection = activeConnections.object[edge.fromConnectionID];
											const toConnection = activeConnections.object[edge.toConnectionID];
											const fromNodeID = fromConnection.nodeID === fromNode.id;
											const fromEntityID = fromConnection.entityID === relationship.gauze__relationship__from_id;
											const fromEntityType = fromConnection.entityType === fromHeader.graphql_meta_type;
											const toNodeID = toConnection.nodeID === toNode.id;
											const toEntityID = toConnection.entityID === relationship.gauze__relationship__to_id;
											const toEntityType = toConnection.entityType === toHeader.graphql_meta_type;
											return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
										});
										if (edge) {
											console.log("edge found!");
										} else {
											// loop through activeNodeEntityMap using from
											// loop through activeNodeEntityMap using to
											const fromConnectionID = uuidv4();
											const fromConnection = {
												id: fromConnectionID,
												name: "from",
												nodeID: fromNode.id,
												entityID: relationship.gauze__relationship__from_id,
												entityType: fromHeader.graphql_meta_type,
												x: null,
												y: null,
												z: 1,
												component: component.default,
												props: {
													gauze: gauze,
													model: model,
													router: router,
													graph: graph,
												},
											};
											const toConnectionID = uuidv4();
											const toConnection = {
												id: toConnectionID,
												name: "to",
												nodeID: toNode.id,
												entityID: relationship.gauze__relationship__to_id,
												entityType: toHeader.graphql_meta_type,
												x: null,
												y: null,
												z: 1,
												component: component.default,
												props: {
													gauze: gauze,
													model: model,
													router: router,
													graph: graph,
												},
											};
											const edgeID = uuidv4();
											const edge = {
												id: edgeID,
												fromNodeID: fromNode.id,
												fromConnectionID: fromConnectionID,
												toNodeID: toNode.id,
												toConnectionID: toConnectionID,
											};
											graph.createConnections([fromConnection, toConnection]);
											graph.createEdges([edge]);
										}
									});
								});
							});
						return synchronize(services, agentHeader, null);
					});
				});
			});
		})
		.catch(function (err) {
			console.error(err);
			throw err;
		});
}

function createRelationship(services, agentHeader, relationship) {
	return import("./components/Relationship.jsx").then(function (component) {
		const { gauze, model, router, graph } = services;
		const activeNodes = graph.activeNodes(agentHeader.name);
		const activeEdges = graph.activeEdges(agentHeader.name);
		const activeConnections = graph.activeConnections(agentHeader.name);
		const activeEntityToNodeMap = {};
		const activeEntityIDs = activeNodes.values
			.map(function (node) {
				return node.props.data.map(function (entity) {
					const entityID = entity[node.props.primary_key];
					if (activeEntityToNodeMap[entityID]) {
						activeEntityToNodeMap[entityID].push(node);
					} else {
						activeEntityToNodeMap[entityID] = [node];
					}
					return entityID;
				});
			})
			.flat();
		const edge = activeEdges.values.find(function (edge) {
			const fromConnection = activeConnections.object[edge.fromConnectionID];
			const toConnection = activeConnections.object[edge.toConnectionID];
			const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
			const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
			const toEntityID = toConnection.entityID === relationship.toEntityID;
			const toEntityType = toConnection.entityType === relationship.toEntityType;
			return fromEntityID && fromEntityType && toEntityID && toEntityType;
		});
		if (edge) {
			console.log("edge", edge);
		} else {
			const headers = model.all("HEADER");
			const relationshipHeader = headers.find(function (header) {
				return header.name === "relationship";
			});
			const fromHeader = headers.find(function (header) {
				return header.graphql_meta_type === relationship.fromEntityType;
			});
			const toHeader = headers.find(function (header) {
				return header.graphql_meta_type === relationship.toEntityType;
			});
			const attributes = {
				gauze__relationship__from_id: relationship.fromEntityID,
				gauze__relationship__from_type: fromHeader.table_name,
				gauze__relationship__to_id: relationship.toEntityID,
				gauze__relationship__to_type: toHeader.table_name,
			};
			return gauze
				.create(relationshipHeader, {
					attributes: attributes,
				})
				.then(function (data) {
					// create a relationship, create the connections, create the edge
					activeEntityToNodeMap[relationship.fromEntityID].forEach(function (fromNode) {
						activeEntityToNodeMap[relationship.toEntityID].forEach(function (toNode) {
							const edge = activeEdges.values.find(function (edge) {
								const fromConnection = activeConnections.object[edge.fromConnectionID];
								const toConnection = activeConnections.object[edge.toConnectionID];
								const fromNodeID = fromConnection.nodeID === fromNode.id;
								const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
								const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
								const toNodeID = toConnection.nodeID === toNode.id;
								const toEntityID = toConnection.entityID === relationship.toEntityID;
								const toEntityType = toConnection.entityType === relationship.toEntityType;
								return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
							});
							if (edge) {
								console.log("edge", edge);
							} else {
								//alert(JSON.stringify(relationship, null, 4));
								const fromConnectionID = uuidv4();
								const fromConnection = {
									id: fromConnectionID,
									name: "from",
									nodeID: fromNode.id,
									entityID: relationship.fromEntityID,
									entityType: relationship.fromEntityType,
									x: null,
									y: null,
									z: 1,
									component: component.default,
									props: {
										gauze: gauze,
										model: model,
										router: router,
										graph: graph,
									},
								};
								const toConnectionID = uuidv4();
								const toConnection = {
									id: toConnectionID,
									name: "to",
									nodeID: toNode.id,
									entityID: relationship.toEntityID,
									entityType: relationship.toEntityType,
									x: null,
									y: null,
									z: 1,
									component: component.default,
									props: {
										gauze: gauze,
										model: model,
										router: router,
										graph: graph,
									},
								};
								const edgeID = uuidv4();
								const edge = {
									id: edgeID,
									fromNodeID: fromNode.id,
									fromConnectionID: fromConnectionID,
									toNodeID: toNode.id,
									toConnectionID: toConnectionID,
								};
								graph.createConnections([fromConnection, toConnection]);
								graph.createEdges([edge]);
							}
						});
					});
					return synchronize(services, agentHeader, null);
				});
		}
	});
}

function deleteRelationship(services, agentHeader, relationship) {
	const { gauze, model, graph } = services;
	const activeNodes = graph.activeNodes(agentHeader.name);
	const activeEdges = graph.activeEdges(agentHeader.name);
	const activeConnections = graph.activeConnections(agentHeader.name);
	const headers = model.all("HEADER");
	const activeEntityToNodeMap = {};
	const activeEntityIDs = activeNodes.values
		.map(function (node) {
			return node.props.data.map(function (entity) {
				const entityID = entity[node.props.primary_key];
				if (activeEntityToNodeMap[entityID]) {
					activeEntityToNodeMap[entityID].push(node);
				} else {
					activeEntityToNodeMap[entityID] = [node];
				}
				return entityID;
			});
		})
		.flat();
	const relationshipHeader = headers.find(function (header) {
		return header.name === "relationship";
	});
	const fromHeader = headers.find(function (header) {
		return header.graphql_meta_type === relationship.fromEntityType;
	});
	const toHeader = headers.find(function (header) {
		return header.graphql_meta_type === relationship.toEntityType;
	});
	const attributes = {
		gauze__relationship__from_id: relationship.fromEntityID,
		gauze__relationship__from_type: fromHeader.table_name,
		gauze__relationship__to_id: relationship.toEntityID,
		gauze__relationship__to_type: toHeader.table_name,
	};
	return gauze
		.read(relationshipHeader, {
			where: attributes,
		})
		.then(function (read) {
			if (read && read.length) {
				const found = read[0];
				const where = {
					[relationshipHeader.primary_key]: found.attributes[relationshipHeader.primary_key],
				};
				return gauze
					.delete(relationshipHeader, {
						where: where,
					})
					.then(function (deleted) {
						activeEntityToNodeMap[relationship.fromEntityID].forEach(function (fromNode) {
							activeEntityToNodeMap[relationship.toEntityID].forEach(function (toNode) {
								const edge = activeEdges.values.find(function (edge) {
									const fromConnection = activeConnections.object[edge.fromConnectionID];
									const toConnection = activeConnections.object[edge.toConnectionID];
									const fromNodeID = fromConnection.nodeID === fromNode.id;
									const fromEntityID = fromConnection.entityID === relationship.fromEntityID;
									const fromEntityType = fromConnection.entityType === relationship.fromEntityType;
									const toNodeID = toConnection.nodeID === toNode.id;
									const toEntityID = toConnection.entityID === relationship.toEntityID;
									const toEntityType = toConnection.entityType === relationship.toEntityType;
									return fromNodeID && fromEntityID && fromEntityType && toNodeID && toEntityID && toEntityType;
								});
								if (edge) {
									// delete the connections and then delete the edge and then synchronize
									const fromConnection = activeConnections.object[edge.fromConnectionID];
									const toConnection = activeConnections.object[edge.toConnectionID];
									graph.deleteConnections([fromConnection, toConnection]);
									graph.deleteEdges([edge]);
									return synchronize(services, agentHeader, null);
								}
							});
						});
					});
			}
		});
}

export {
	createNode,
	createSpace,
	reloadSpace,
	reloadSpaceRelationships,
	createSpaceRelationship,
	deleteSpaceRelationship,
	traverseSpaceTo,
	traverseSpaceFrom,
	traverseSpaceRoot,
	synchronizeSpace,
	read,
	reload,
	synchronize,
	traverse,
	traverseTo,
	traverseFrom,
	traverseRoot,
	createRelationship,
	deleteRelationship,
	reloadRelationships,
};
