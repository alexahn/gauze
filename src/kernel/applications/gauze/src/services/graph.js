import { v4 as uuidv4 } from "uuid";

class GraphService {
	constructor() {
		this.nodes = {};
		this.edges = {};
		this.connections = {};
	}
	root(type) {
		const self = this;
		return Object.values(self.nodes).find(function (node) {
			return node.root === true && node.props.type === type;
		});
	}
	syncNodeEdges(node, data) {
		const self = this;
		const rawEdges = [];
		const newEdges = [];
		let nodeEdges = [];
		const newConnections = [];
		let nodeConnections = [];
		const connectionsArray = Object.values(self.connections);
		const edgesArray = Object.values(self.edges);
		if (node.props.from) {
			data.forEach(function (item) {
				const edge = {};
				const foundEdge = edgesArray.find(function (e) {
					const fromNodeID = e.fromNodeID === node.props.fromNodeID;
					const fromEntityID = self.connections[e.fromConnectionID].entityID === node.props.from._metadata.id;
					const fromEntityType = self.connections[e.fromConnectionID].entityType === node.props.from._metadata.type;
					const fromConnectionID = fromEntityID && fromEntityType;
					const toNodeID = e.toNodeID === node.id;
					const toEntityID = self.connections[e.toConnectionID].entityID === item[node.props.primary_key];
					const toEntityType = self.connections[e.toConnectionID].entityType === node.props.graphql_meta_type;
					const toConnectionID = toEntityID && toEntityType;
					return fromNodeID && fromConnectionID && toNodeID && toConnectionID;
				});
				if (foundEdge) {
					nodeConnections = nodeConnections.concat(
						connectionsArray.filter(function (connection) {
							const entityID = connection.entityID === item[node.props.primary_key];
							const entityType = connection.entityType === node.props.graphql_meta_type;
							return entityID && entityType;
						}),
					);
					edge.from = self.connections[foundEdge.fromConnectionID];
					edge.to = self.connections[foundEdge.toConnectionID];
					nodeEdges.push(foundEdge);
				} else {
					nodeConnections = nodeConnections.concat(
						connectionsArray.filter(function (connection) {
							const name = connection.name === "from";
							const entityID = connection.entityID === item[node.props.primary_key];
							const entityType = connection.entityType === node.props.graphql_meta_type;
							return name && entityID && entityType;
						}),
					);
					const newFrom = {
						id: uuidv4(),
						nodeID: node.props.fromNodeID,
						name: "from",
						entityID: node.props.from._metadata.id,
						entityType: node.props.from._metadata.type,
						x: null,
						y: null,
						z: 1,
					};
					edge.from = newFrom;
					newConnections.push(newFrom);
					nodeConnections.push(newFrom);
					const newTo = {
						id: uuidv4(),
						nodeID: node.id,
						name: "to",
						entityID: item[node.props.primary_key],
						entityType: node.props.graphql_meta_type,
						x: null,
						y: null,
						z: 1,
					};
					edge.to = newTo;
					newConnections.push(newTo);
					nodeConnections.push(newTo);
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
			data.forEach(function (item) {
				const edge = {};
				const foundEdge = edgesArray.find(function (e) {
					const fromNodeID = e.fromNodeID === node.id;
					const fromEntityID = self.connections[e.fromConnectionID].entityID === item[node.props.primary_key];
					const fromEntityType = self.connections[e.fromConnectionID].entityType === node.props.graphql_meta_type;
					const fromConnectionID = fromEntityID && fromEntityType;
					const toNodeID = e.toNodeID === node.props.toNodeID;
					const toEntityID = self.connections[e.toConnectionID].entityID === node.props.to._metadata.id;
					const toEntityType = self.connections[e.toConnectionID].entityType === node.props.to._metadata.type;
					const toConnectionID = toEntityID && toEntityType;
					return fromNodeID && fromConnectionID && toNodeID && toConnectionID;
				});
				if (foundEdge) {
					nodeConnections = nodeConnections.concat(
						connectionsArray.filter(function (connection) {
							const entityID = connection.entityID === item[node.props.primary_key];
							const entityType = connection.entityType === node.props.graphql_meta_type;
							return entityID && entityType;
						}),
					);
					edge.from = self.connections[foundEdge.fromConnectionID];
					edge.to = self.connections[foundEdge.toConnectionID];
					nodeEdges.push(foundEdge);
				} else {
					nodeConnections = nodeConnections.concat(
						connectionsArray.filter(function (connection) {
							const name = connection.name === "from";
							const entityID = connection.entityID === item[node.props.primary_key];
							const entityType = connection.entityType === node.props.graphql_meta_type;
							return name && entityID && entityType;
						}),
					);
					const newFrom = {
						id: uuidv4(),
						nodeID: node.id,
						name: "from",
						entityID: item[node.props.primary_key],
						entityType: node.props.graphql_meta_type,
						x: null,
						y: null,
						z: 1,
					};
					edge.from = newFrom;
					newConnections.push(newFrom);
					nodeConnections.push(newFrom);
					const newTo = {
						id: uuidv4(),
						nodeID: node.props.toNodeID,
						name: "to",
						entityID: node.props.to._metadata.id,
						entityType: node.props.to._metadata.type,
						x: null,
						y: null,
						z: 1,
					};
					edge.to = newTo;
					newConnections.push(newTo);
					nodeConnections.push(newTo);
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
		return {
			nodeConnections: nodeConnections,
			newConnections: newConnections,
			nodeEdges: nodeEdges,
			newEdges: newEdges,
		};
	}
	syncNodesEdges(results) {
		const self = this;
		const mapped = results.map(function (result) {
			// node, header, data, count
			return self.syncNodeEdges(result.node, result.data);
		});
		// stitch
		let nodeConnections = [];
		let newConnections = [];
		let nodeEdges = [];
		let newEdges = [];
		mapped.forEach(function (synced) {
			nodeConnections = nodeConnections.concat(synced.nodeConnections);
			newConnections = newConnections.concat(synced.newConnections);
			nodeEdges = nodeEdges.concat(synced.nodeEdges);
			newEdges = newEdges.concat(synced.newEdges);
		});
		return {
			nodeConnections,
			newConnections,
			nodeEdges,
			newEdges,
		};
	}
	syncNodeConnections(nodes, edges, connections) {
		const index = {};
		const edgesArray = Object.values(edges);
		edgesArray.forEach(function (edge) {
			const fromNode = nodes[edge.fromNodeID];
			const toNode = nodes[edge.toNodeID];
			const fromConnection = connections[edge.fromConnectionID];
			const toConnection = connections[edge.toConnectionID];
			const from = fromNode.props.data.find(function (item) {
				const entityID = fromConnection.entityID === item[fromNode.props.primary_key];
				const entityType = fromConnection.entityType === fromNode.props.graphql_meta_type;
				return entityID && entityType;
			});
			const to = toNode.props.data.find(function (item) {
				const entityID = toConnection.entityID === item[toNode.props.primary_key];
				const entityType = toConnection.entityType === toNode.props.graphql_meta_type;
				return entityID && entityType;
			});
			if (from && to) {
				// valid edge
				if (index[fromNode.id]) {
					index[fromNode.id].connections.push(fromConnection.id);
				} else {
					index[fromNode.id] = {
						connections: [fromConnection.id],
					};
				}
				if (index[toNode.id]) {
					index[toNode.id].connections.push(toConnection.id);
				} else {
					index[toNode.id] = {
						connections: [toConnection.id],
					};
				}
			}
		});
		return index;
	}
	activeNodes(rootType, nodes, edges, connections, map) {
		const self = this;
		const activeNodesArray = self.activeNodesArray(rootType, nodes, edges, connections, map);
		const activeNodes = {};
		activeNodesArray.forEach(function (node) {
			activeNodes[node.id] = node;
		});
		return activeNodes;
	}
	activeNodesArray(rootType, nodes, edges, connections, map) {
		const reachedInside = {};
		const reachedOutside = {};
		const nodesArray = Object.values(nodes);
		nodesArray.forEach(function (node) {
			if (node.root === true && node.props.type === rootType) {
				if (reachedOutside[node.id]) {
					reachedInside[node.id] = reachedOutside[node.id];
				} else {
					if (reachedInside[node.id]) {
						reachedInside[node.id].push(node.id);
					} else {
						reachedInside[node.id] = [node.id];
					}
				}
			} else {
				if (node.props.from) {
					if (reachedInside[node.props.fromNodeID]) {
						if (reachedOutside[node.props.fromNodeID]) {
							reachedInside[node.props.fromNodeID] = reachedInside[node.props.fromNodeID].concat(reachedOutside[node.props.fromNodeID]);
							reachedInside[node.props.fromNodeID].push(node.id);
						} else {
							reachedInside[node.props.fromNodeID].push(node.id);
							reachedInside[node.props.fromNodeID].push(node.props.fromNodeID);
						}
						if (reachedOutside[node.id]) {
							reachedInside[node.props.fromNodeID] = reachedInside[node.props.fromNodeID].concat(reachedOutside[node.id]);
							reachedInside[node.props.fromNodeID].push(node.props.fromNodeID);
						} else {
							reachedInside[node.props.fromNodeID].push(node.id);
							reachedInside[node.props.fromNodeID].push(node.props.fromNodeID);
						}
						if (reachedInside[node.id]) {
							reachedInside[node.id].push(node.props.fromNodeID);
						} else {
							reachedInside[node.id] = [node.id, node.props.fromNodeID];
						}
					} else {
						if (reachedOutside[node.props.fromNodeID]) {
							reachedOutside[node.props.fromNodeID].push(node.id);
						} else {
							reachedOutside[node.props.fromNodeID] = [node.id, node.props.fromNodeID];
						}
						if (reachedOutside[node.id]) {
							reachedOutside[node.id].push(node.props.fromNodeID);
						} else {
							reachedOutside[node.id] = [node.props.fromNodeID, node.ID];
						}
					}
					if (reachedInside[node.id]) {
						if (reachedOutside[node.id]) {
							reachedInside[node.id] = reachedInside[node.id].concat(reachedOutside[node.id]);
							reachedInside[node.id].push(node.props.fromNodeID);
						} else {
							reachedInside[node.id].push(node.props.fromNodeID);
							reachedInside[node.id].push(node.id);
						}
						if (reachedOutside[node.props.fromNodeID]) {
							reachedInside[node.id] = reachedInside[node.id].concat(reachedOutside[node.props.fromNodeID]);
							reachedInside[node.id].push(node.id);
						} else {
							reachedInside[node.id].push(node.props.fromNodeID);
							reachedInside[node.id].push(node.id);
						}
					} else {
						if (reachedOutside[node.id]) {
							reachedOutside[node.id].push(node.props.fromNodeID);
						} else {
							reachedOutside[node.id] = [node.props.fromNodeID, node.id];
						}
						if (reachedOutside[node.props.fromNodeID]) {
							reachedOutside[node.props.fromNodeID].push(node.id);
						} else {
							reachedOutside[node.props.fromNodeID] = [node.id, node.props.fromNodeID];
						}
					}
				} else if (node.props.to) {
					if (reachedInside[node.props.toNodeID]) {
						if (reachedOutside[node.props.toNodeID]) {
							reachedInside[node.props.toNodeID] = reachedInside[node.props.toNodeID].concat(reachedOutside[node.props.toNodeID]);
							reachedInside[node.props.toNodeID].push(node.id);
						} else {
							reachedInside[node.props.toNodeID].push(node.id);
							reachedInside[node.props.toNodeID].push(node.props.toNodeID);
						}
						if (reachedOutside[node.id]) {
							reachedInside[node.props.toNodeID] = reachedInside[node.props.toNodeID].concat(reachedOutside[node.id]);
							reachedInside[node.props.toNodeID].push(node.props.toNodeID);
						} else {
							reachedInside[node.props.toNodeID].push(node.id);
							reachedInside[node.props.toNodeID].push(node.props.toNodeID);
						}
						if (reachedInside[node.id]) {
							reachedInside[node.id].push(node.props.toNodeID);
						} else {
							reachedInside[node.id] = [node.id, node.props.toNodeID];
						}
					} else {
						if (reachedOutside[node.props.toNodeID]) {
							reachedOutside[node.props.toNodeID].push(node.id);
						} else {
							reachedOutside[node.props.toNodeID] = [node.props.toNodeID, node.id];
						}
						if (reachedOutside[node.id]) {
							reachedOutside[node.id].push(node.props.toNodeID);
						} else {
							reachedOutside[node.id] = [node.props.toNodeID, node.id];
						}
					}
					if (reachedInside[node.id]) {
						if (reachedOutside[node.id]) {
							reachedInside[node.id] = reachedInside[node.id].concat(reachedOutside[node.id]);
							reachedInside[node.id].push(node.props.toNodeID);
						} else {
							reachedInside[node.id].push(node.props.toNodeID);
							reachedInside[node.id].push(node.id);
						}
						if (reachedOutside[node.props.toNodeID]) {
							reachedInside[node.id] = reachedInside[node.props.id].concat(reachedOutside[node.props.toNodeID]);
							reachedInside[node.id].push(node.id);
						} else {
							reachedInside[node.id].push(node.props.toNodeID);
							reachedInside[node.id].push(node.id);
						}
					} else {
						if (reachedOutside[node.id]) {
							reachedOutside[node.id].push(node.props.toNodeID);
						} else {
							reachedOutside[node.id] = [node.props.toNodeID, node.id];
						}
						if (reachedOutside[node.props.toNodeID]) {
							reachedOutside[node.props.toNodeID].push(node.id);
						} else {
							reachedOutside[node.props.toNodeID] = [node.id, node.props.toNodeID];
						}
					}
				} else {
				}
			}
		});
		// flatten reachedInside
		const activeNodesIndex = {};
		Object.keys(reachedInside).forEach(function (key) {
			activeNodesIndex[key] = true;
			const reached = reachedInside[key];
			reached.forEach(function (id) {
				activeNodesIndex[id] = true;
			});
		});
		const activeNodesArray = Object.keys(activeNodesIndex).map(function (id) {
			return nodes[id];
		});
		if (map) {
			return activeNodesArray.map(map);
		} else {
			return activeNodesArray;
		}
	}
	activeEdges(nodes, edges, connections, map) {
		const self = this;
		const activeEdgesArray = self.activeEdgesArray(nodes, edges, connections, map);
		const activeEdges = {};
		activeEdgesArray.forEach(function (edge) {
			activeEdges[edge.id] = edge;
		});
		return activeEdges;
	}
	activeEdgesArray(nodes, edges, connections, map) {
		const index = {};
		const edgesArray = Object.values(edges);
		const activeEdgesArray = edgesArray.filter(function (edge) {
			const fromNode = nodes[edge.fromNodeID];
			const toNode = nodes[edge.toNodeID];
			const fromConnection = connections[edge.fromConnectionID];
			const toConnection = connections[edge.toConnectionID];
			const from = fromNode.props.data.find(function (item) {
				const entityID = fromConnection.entityID === item[fromNode.props.primary_key];
				const entityType = fromConnection.entityType === fromNode.props.graphql_meta_type;
				return entityID && entityType;
			});
			const to = toNode.props.data.find(function (item) {
				const entityID = toConnection.entityID === item[toNode.props.primary_key];
				const entityType = toConnection.entityType === toNode.props.graphql_meta_type;
				return entityID && entityType;
			});
			return from && to;
		});
		if (map) {
			return activeEdgesArray.map(map);
		} else {
			return activeEdgesArray;
		}
	}
	activeConnections(nodes, edges, connections, map) {
		const self = this;
		const activeConnectionsArray = self.activeConnectionsArray(nodes, edges, connections, map);
		const activeConnections = {};
		activeConnectionsArray.forEach(function (connection) {
			activeConnections[connection.id] = connection;
		});
		return activeConnections;
	}
	activeConnectionsArray(nodes, edges, connections, map) {
		const self = this;
		const activeEdgesArray = self.activeEdgesArray(nodes, edges, connections);
		let activeConnectionsArray = [];
		activeEdgesArray.forEach(function (edge) {
			activeConnectionsArray = activeConnectionsArray.concat([connections[edge.fromConnectionID], connections[edge.toConnectionID]]);
		});
		if (map) {
			return activeConnectionsArray.map(map);
		} else {
			return activeConnectionsArray;
		}
	}
	initializeNodes(candidates) {
		const self = this;
		//const staged = { ...self.nodes };
		const staged = self.nodes;
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
					if (item.root === true && max <= candidate) {
						return candidate;
					} else if (item.render && max <= candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const xMax = nodesArray.reduce(function (max, item) {
					const candidate = item.x + item.oldWidth * item.z;
					if (node.root === true && max < candidate) {
						return item.x;
					} else if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const yMax = nodesArray.reduce(function (max, item) {
					const candidate = item.y + item.oldHeight * item.z;
					if (node.root === true && max < candidate) {
						return item.y;
					} else if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const padding = 0;
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
		//setNodes(staged);
		self.nodes = staged;
	}
	// node methods
	readNodes(candidates) {
		const self = this;
		return candidates.map(function (node) {
			return self.nodes[node.id];
		});
	}
	createNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		//const staging = { ...nodes };
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		self.nodes = staging;
		//setNodes(staging);
		//setComplete(false);
	}
	updateNodes(candidates) {
		const self = this;
		//const staging = { ...nodes };
		const staging = self.nodes;
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		//setNodes(staging);
		self.nodes = staging;
	}
	deleteNodes(candidates) {
		const self = this;
		//const staging = { ...nodes };
		const staging = self.nodes;
		candidates.forEach(function (node) {
			delete staging[node.id];
		});
		//setNodes(staging);
		self.nodes = staging;
	}
	// edge methods
	readEdges(candidates) {
		const self = this;
		return candidates.map(function (edge) {
			return self.edges[edge.id];
		});
	}
	createEdges(candidates) {
		const self = this;
		//const staging = { ...edges };
		const staging = self.edges;
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		//setEdges(staging);
		self.edges = staging;
	}
	updateEdges(candidates) {
		//const staging = { ...edges };
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		//setEdges(staging);
		self.edges = staging;
	}
	deleteEdges(candidates) {
		//const staging = { ...edges };
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			delete staging[edge.id];
		});
		//setEdges(staging);
		self.edges = staging;
	}
	// connection methods
	initializeConnections(candidates) {
		const self = this;
		//const staged = { ...connections };
		const staged = self.connections;
		const connectionsArray = Object.values(staged);
		const nodesArray = Object.values(self.nodes);
		candidates.forEach(function (connection) {
			const { width, height } = connection;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			const z = nodesArray[0].z;
			staged[connection.id] = {
				...connection,
				z: z,
			};
		});
		//setConnections(staged);
		self.connections = staged;
	}
	readConnections(candidates) {
		const self = this;
		return candidates.map(function (connection) {
			return self.connections[connection.id];
		});
	}
	createConnections(candidates) {
		const self = this;
		//const staging = { ...connections };
		const staging = self.connections;
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		//setConnections(staging);
		self.connections = staging;
	}
	updateConnections(candidates) {
		const self = this;
		//const staging = { ...connections };
		const staging = self.connections;
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		//setConnections(staging);
		self.connections = staging;
	}
	deleteConnections(candidates) {
		//const staging = { ...connections };
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			delete staging[connection.id];
		});
		//setConnections(staging);
		self.connections = staging;
	}
}

export default new GraphService();
