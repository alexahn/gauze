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
					const newTo = {
						id: uuidv4(),
						nodeID: node.id,
						name: "to",
						entityID: item[node.props.primary_key],
						entityType: node.props.graphql_meta_type,
						x: null,
						y: null,
					};
					edge.to = newTo;
					newConnections.push(newTo);
					nodeConnections.push(newTo);
				}
				const foundEdge = edgesArray.find(function (e) {
					const fromNodeID = e.fromNodeID === node.props.fromNodeID;
					const fromConnectionID = e.fromConnectionID === edge.from.id;
					const toNodeID = e.toNodeID === node.id;
					const toConnectionID = e.toConnectionID === edge.to.id;
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
					const newTo = {
						id: uuidv4(),
						nodeID: node.id,
						name: "to",
						entityID: node.props.to._metadata.id,
						entityType: node.props.to._metadata.type,
						x: null,
						y: null,
					};
					edge.to = newTo;
					newConnections.push(newTo);
					nodeConnections.push(newTo);
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
		candidates.forEach(function (connection) {
			const { width, height } = node;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			staged[connection.id] = connection;
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
