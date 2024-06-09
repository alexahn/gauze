import { v4 as uuidv4 } from "uuid";

class GraphService {
	constructor() {
		this.nodes = {};
		/*
			edge: {
				fromNodeID
				fromConnectionID
				toNodeID
				toConnectionID
			}
		*/
		this.edges = {};
		/*
			connection: {
				name
				nodeID
				entityID
				entityType
				x
				y
				z
			}
		*/
		this.connections = {};
		this.interaction = null;
		this.cache = {
			activeNodes: {},
			activeConnections: {},
			activeEdges: {},
			nodeConnections: {},
		};
		this.isPanning = false;
		this.isZooming = false;
		this.isDragging = false;
		this.debounce = {
			zooming: {},
			panning: {},
			dragging: {},
		};
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
			if (fromNode && fromConnection && toNode && toConnection) {
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
			}
		});
		return index;
	}
	activeNodes(rootType) {
		const self = this;
		if (self.cache.activeNodes[rootType]) {
			return self.cache.activeNodes[rootType];
		} else {
			const reachedInside = {};
			const reachedOutside = {};
			const nodesArray = Object.values(self.nodes);
			nodesArray.forEach(function (node) {
				if ((node.root === true && node.props.type === rootType) || node.workspace === rootType) {
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
			const nodes = {};
			for (const key of Object.keys(activeNodesIndex)) {
				nodes[key] = self.nodes[key];
			}
			const activeNodes = {
				object: nodes,
				values: Object.values(nodes),
				keys: Object.keys(nodes),
			};
			self.cache.activeNodes[rootType] = activeNodes;
			return activeNodes;
		}
	}
	activeConnections(rootType) {
		const self = this;
		if (self.cache.activeConnections[rootType]) {
			return self.cache.activeConnections[rootType];
		} else {
			const activeNodes = self.activeNodes(rootType);
			const connections = { ...self.connections };
			for (const [key, value] of Object.entries(connections)) {
				if (!activeNodes.object[value.nodeID]) {
					delete connections[key];
				}
			}
			const activeConnections = {
				object: connections,
				values: Object.values(connections),
				keys: Object.keys(connections),
			};
			self.cache.activeConnections[rootType] = activeConnections;
			return activeConnections;
		}
	}
	activeEdges(rootType) {
		const self = this;
		if (self.cache.activeEdges[rootType]) {
			return self.cache.activeEdges[rootType];
		} else {
			const activeNodes = self.activeNodes(rootType);
			const activeConnections = self.activeConnections(rootType);
			const edges = { ...self.edges };
			for (const [key, value] of Object.entries(edges)) {
				const fromNode = activeNodes.object[value.fromNodeID];
				const fromConnection = activeConnections.object[value.fromConnectionID];
				const toNode = activeNodes.object[value.toNodeID];
				const toConnection = activeConnections.object[value.toConnectionID];
				if (fromNode && fromConnection && toNode && toConnection) {
					// check that the connection references a data item
					const fromEntity = fromNode.props.data.find(function (entity) {
						const entityID = fromConnection.entityID === entity[fromNode.props.primary_key];
						const entityType = fromConnection.entityType === fromNode.props.graphql_meta_type;
						return entityID && entityType;
					});
					const toEntity = toNode.props.data.find(function (entity) {
						const entityID = toConnection.entityID === entity[toNode.props.primary_key];
						const entityType = toConnection.entityType === toNode.props.graphql_meta_type;
						return entityID && entityType;
					});
					if (!fromEntity || !toEntity) {
						delete edges[key];
					}
				} else {
					delete edges[key];
				}
			}
			const activeEdges = {
				object: edges,
				values: Object.values(edges),
				keys: Object.keys(edges),
			};
			self.cache.activeEdges[rootType] = activeEdges;
			return activeEdges;
		}
	}
	nodeConnections(nodeID) {
		const self = this;
		if (self.cache.nodeConnections[nodeID]) {
			return self.cache.nodeConnections[nodeID];
		} else {
			const connections = { ...self.connections };
			for (const [key, value] of Object.entries(connections)) {
				if (value.nodeID !== nodeID) {
					delete connections[key];
				}
			}
			const nodeConnections = {
				object: connections,
				values: Object.values(connections),
				keys: Object.keys(connections),
			};
			self.cache.nodeConnections[nodeID] = nodeConnections;
			return nodeConnections;
		}
	}
	clearCacheNodes() {
		const self = this;
		self.cache.activeNodes = {};
		self.cache.activeConnections = {};
		self.cache.activeEdges = {};
		self.cache.nodeConnections = {};
	}
	clearCacheConnections() {
		const self = this;
		self.cache.activeConnections = {};
		self.cache.activeEdges = {};
		self.cache.nodeConnections = {};
	}
	clearCacheEdges() {
		const self = this;
		self.cache.activeEdges = {};
	}
	selectNodes(keys) {
		const self = this;
		return keys.map(function (key) {
			return self.nodes[key];
		});
	}
	selectNode(key) {
		const self = this;
		return self.nodes[key];
	}
	selectConnections(keys) {
		const self = this;
		return keys.map(function (key) {
			return self.connections[key];
		});
	}
	selectConnection(key) {
		const self = this;
		return self.connections[key];
	}
	selectEdges(keys) {
		const self = this;
		return keys.map(function (key) {
			return self.edges[key];
		});
	}
	selectEdge(key) {
		const self = this;
		return self.edges[key];
	}
	initializeNodes(rootType, candidates) {
		const self = this;
		const staged = self.activeNodes(rootType).object;
		const activeNodes = self.activeNodes(rootType);
		candidates.forEach(function (node) {
			const { width, height } = node;
			if (width === null || height === null) throw new Error(`Cannot initialize with null dimensions: width=${width} height=${height}`);
			if (node.render) {
				staged[node.id] = node;
			} else {
				// get max x in nodes
				// get max y in nodes
				const zMax = activeNodes.values.reduce(function (max, item) {
					const candidate = item.z;
					if (item.root === true && max <= candidate) {
						return candidate;
					} else if (item.render && max <= candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const xMax = activeNodes.values.reduce(function (max, item) {
					const candidate = item.x + item.oldWidth * item.z;
					if (node.root === true && max < candidate) {
						return item.x;
					} else if (max < candidate) {
						return candidate;
					} else {
						return max;
					}
				}, 0);
				const yMax = activeNodes.values.reduce(function (max, item) {
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
		self.updateNodes(Object.values(staged));
		self.clearCacheNodes();
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
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		self.nodes = staging;
		self.clearCacheNodes();
	}
	updateNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		self.nodes = staging;
		self.clearCacheNodes();
	}
	deleteNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		candidates.forEach(function (node) {
			delete staging[node.id];
		});
		self.nodes = staging;
		self.clearCacheNodes();
	}
	// connection methods
	initializeConnections(candidates) {
		const self = this;
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
				render: true,
			};
		});
		self.connections = staged;
		self.clearCacheConnections();
	}
	readConnections(candidates) {
		const self = this;
		return candidates.map(function (connection) {
			return self.connections[connection.id];
		});
	}
	createConnections(candidates) {
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		self.connections = staging;
		self.clearCacheConnections();
	}
	updateConnections(candidates) {
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		self.connections = staging;
		self.clearCacheConnections();
	}
	deleteConnections(candidates) {
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			delete staging[connection.id];
		});
		self.connections = staging;
		self.clearCacheConnections();
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
		const staging = self.edges;
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		self.edges = staging;
		self.clearCacheEdges();
	}
	updateEdges(candidates) {
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		self.edges = staging;
		self.clearCacheEdges();
	}
	deleteEdges(candidates) {
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			delete staging[edge.id];
		});
		self.edges = staging;
		self.clearCacheEdges();
	}
	createInteraction(interaction) {
		const self = this;
		self.interaction = interaction;
		return self.interaction;
	}
	readInteraction() {
		const self = this;
		return self.interaction;
	}
	updateInteraction(interaction) {
		const self = this;
		self.interaction = interaction;
		return self.interaction;
	}
	deleteInteraction() {
		const self = this;
		delete self.interaction;
		return self.interaction;
	}
	getPanning() {
		return this.isPanning;
	}
	setPanning(panning) {
		this.isPanning = panning;
		if (this.debounce.panning && this.debounce.panning.timer) {
			clearTimeout(this.debounce.panning.timer);
		}
	}
	debounceSetPanning(panning, delay) {
		const self = this;
		if (self.debounce.panning.timer) {
			clearTimeout(self.debounce.panning.timer);
			if (self.debounce.panning.value !== panning) {
				self.setPanning(self.debounce.panning.value);
			}
		}
		const timer = setTimeout(function () {
			self.setPanning(panning);
		}, delay);
		self.debounce.panning = {
			timer: timer,
			value: panning,
		};
	}
	getZooming() {
		return this.isZooming;
	}
	setZooming(zooming) {
		this.isZooming = zooming;
		if (this.debounce.zooming && this.debounce.zooming.timer) {
			clearTimeout(this.debounce.zooming.timer);
		}
	}
	debounceSetZooming(zooming, delay) {
		const self = this;
		if (self.debounce.zooming.timer) {
			clearTimeout(self.debounce.zooming.timer);
			if (self.debounce.zooming.value !== zooming) {
				self.setZooming(self.debounce.zooming.value);
			}
		}
		const timer = setTimeout(function () {
			self.setZooming(zooming);
		}, delay);
		self.debounce.zooming = {
			timer: timer,
			value: zooming,
		};
	}
	getDragging() {
		return this.isDragging;
	}
	setDragging(dragging) {
		this.isDragging = dragging;
		if (this.debounce.dragging && this.debounce.dragging.timer) {
			clearTimeout(this.debounce.dragging.timer);
		}
	}
	debounceSetDragging(dragging, delay) {
		const self = this;
		if (self.debounce.dragging.timer) {
			clearTimeout(self.debounce.dragging.timer);
			if (self.debounce.dragging.value !== dragging) {
				self.setDragging(self.debounce.dragging.value);
			}
		}
		const timer = setTimeout(function () {
			self.setDragging(dragging);
		}, delay);
		self.debounce.dragging = {
			timer: timer,
			value: dragging,
		};
	}
}

export default new GraphService();
