import { v4 as uuidv4 } from "uuid";

import * as gauze from "./gauze.js";
import * as model from "./model.js";
import * as router from "./../router.js";

import * as components from "./../components/index.js";

class GraphService {
	constructor() {
		const self = this;
		/*
			edge: {
				fromNodeID
				fromConnectionID
				toNodeID
				toConnectionID
			}
			connection: {
				name
				nodeID
				entityID
				entityType
				x
				y
				z
			}
			spaces: {
				agent_root: {
					home: {
						nodes: {
							object: {
								[id]: true
							},
							array: [id]
						},
						connections: {
							object: {
								[id]: true
							},
							array: [id]
						},
						edges: {
							object: {
								[id]: true
							},
							array: [id]
						}
					}
				}
			}
		*/
		self.nodes = {};
		self.connections = {};
		self.edges = {};
		self.spaces = {};
		this.interaction = null;
		this.cache = {
			spaces: {
				agent_root: {
					home: {},
				},
				agent_account: {
					home: {},
				},
				agent_user: {
					home: {},
				},
				agent_person: {
					home: {},
				},
				agent_character: {
					home: {},
				},
			},
			agents: {},
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
	clearCache() {
		this.cache = {
			spaces: {
				agent_root: {
					home: {},
				},
				agent_account: {
					home: {},
				},
				agent_user: {
					home: {},
				},
				agent_person: {
					home: {},
				},
				agent_character: {
					home: {},
				},
			},
			agents: {},
		};
	}
	nodesToJSON(nodes) {
		const self = this;
		const json = { ...nodes };
		for (const [key, value] of Object.entries(json)) {
			json[key] = self.nodeToJSON(value);
		}
		return json;
	}
	nodeToJSON(node) {
		const self = this;
		const { component, ...root } = { ...node };
		const { gauze, model, router, graph, ...props } = root.props;
		const json = { ...root, props };
		return json;
	}
	nodesFromJSON(json, services, components) {
		const self = this;
		const nodes = { ...json };
		for (const [key, value] of Object.entries(nodes)) {
			nodes[key] = self.nodeFromJSON(value, services, components);
		}
		return nodes;
	}
	nodeFromJSON(json, services, components) {
		json.component = components.table.default;
		json.props.gauze = services.gauze.default;
		json.props.model = services.model.default;
		json.props.router = services.router.default;
		json.props.graph = services.graph.default;
		return json;
	}
	connectionsToJSON(connections) {
		const self = this;
		const json = { ...connections };
		for (const [key, value] of Object.entries(json)) {
			json[key] = self.connectionToJSON(value);
		}
		return json;
	}
	connectionToJSON(connection) {
		const self = this;
		const { component, ...root } = { ...connection };
		const { gauze, model, router, graph, ...props } = root.props;
		const json = { ...root, props };
		return json;
	}
	connectionsFromJSON(json, services, components) {
		const self = this;
		const connections = { ...json };
		for (const [key, value] of Object.entries(connections)) {
			connections[key] = self.connectionFromJSON(value, services, components);
		}
		return connections;
	}
	connectionFromJSON(json, services, components) {
		json.component = components.relationship.default;
		json.props.gauze = services.gauze.default;
		json.props.model = services.model.default;
		json.props.router = services.router.default;
		json.props.graph = services.graph.default;
		return json;
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
	// this will create the initial set of connections based on the from and to properties on nodes
	// note: remove this since we are loading relationships from the backend?
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
	// this will allow us to update the connectionsIDs for nodes
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
	}
	// node methods
	readNodes(candidates) {
		const self = this;
		return candidates.map(function (node) {
			return self.nodes[node.id];
		});
	}
	readNode(candidate) {
		const self = this;
		return self.nodes[candidate.id];
	}
	createNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		self.nodes = staging;
		return candidates;
	}
	createNode(candidate) {
		const self = this;
		self.nodes[candidate.id] = candidate;
		return candidate;
	}
	updateNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		candidates.forEach(function (node) {
			staging[node.id] = node;
		});
		self.nodes = staging;
		return candidates;
	}
	updateNode(candidate) {
		const self = this;
		self.nodes[candidate.id] = candidate;
		return candidate;
	}
	deleteNodes(candidates) {
		const self = this;
		const staging = self.nodes;
		candidates.forEach(function (node) {
			delete staging[node.id];
		});
		self.nodes = staging;
		return candidates;
	}
	deleteNode(candidate) {
		const self = this;
		delete self.nodes[candidate.id];
		return candidate;
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
	}
	updateConnections(candidates) {
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			staging[connection.id] = connection;
		});
		self.connections = staging;
	}
	deleteConnections(candidates) {
		const self = this;
		const staging = self.connections;
		candidates.forEach(function (connection) {
			delete staging[connection.id];
		});
		self.connections = staging;
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
	}
	updateEdges(candidates) {
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			staging[edge.id] = edge;
		});
		self.edges = staging;
	}
	deleteEdges(candidates) {
		const self = this;
		const staging = self.edges;
		candidates.forEach(function (edge) {
			delete staging[edge.id];
		});
		self.edges = staging;
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
	// CACHE AGENT APIS
	cacheSetAgentSpaces(rootType, spaces) {
		const self = this;
		self.cache.agents[rootType] = spaces;
	}
	cacheClearAgentSpaces(rootType) {
		const self = this;
		delete self.cache.agents[rootType];
	}
	// CACHE SPACE APIS
	cacheSetSpaceNodes(rootType, spaceID, nodes) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				self.cache.spaces[rootType][spaceID].nodes = nodes;
			} else {
				self.cache.spaces[rootType][spaceID] = {
					nodes: nodes,
				};
			}
		} else {
			self.cache.spaces[rootType] = {
				[spaceID]: {
					nodes: nodes,
				},
			};
		}
	}
	cacheClearSpaceNodes(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				if (self.cache.spaces[rootType][spaceID].nodes) {
					delete self.cache.spaces[rootType][spaceID].nodes;
					self.cacheClearSpaceConnections(rootType, spaceID);
					self.cacheClearSpaceEdges(rootType, spaceID);
					return true;
				}
			}
		}
		self.cacheClearSpaceConnections(rootType, spaceID);
		self.cacheClearSpaceEdges(rootType, spaceID);
		return false;
	}
	cacheSetSpaceConnections(rootType, spaceID, connections) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				self.cache.spaces[rootType][spaceID].connections = connections;
			} else {
				self.cache.spaces[rootType][spaceID] = {
					connections: connections,
				};
			}
		} else {
			self.cache.spaces[rootType] = {
				[spaceID]: {
					connections: connections,
				},
			};
		}
	}
	cacheClearSpaceConnections(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				if (self.cache.spaces[rootType][spaceID].connections) {
					delete self.cache.spaces[rootType][spaceID].connections;
					self.cacheClearSpaceEdges(rootType, spaceID);
					return true;
				}
			}
		}
		self.cacheClearSpaceEdges(rootType, spaceID);
		return false;
	}
	cacheSetSpaceEdges(rootType, spaceID, edges) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				self.cache.spaces[rootType][spaceID].edges = edges;
			} else {
				self.cache.spaces[rootType][spaceID] = {
					edges: edges,
				};
			}
		} else {
			self.cache.spaces[rootType] = {
				[spaceID]: {
					edges: edges,
				},
			};
		}
	}
	cacheClearSpaceEdges(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				if (self.cache.spaces[rootType][spaceID].edges) {
					delete self.cache.spaces[rootType][spaceID].edges;
					return true;
				}
			}
		}
		return false;
	}
	cacheSetSpaceNodeConnections(rootType, spaceID, nodeID, nodeConnections) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				if (self.cache.spaces[rootType][spaceID].nodeConnections) {
					self.cache.spaces[rootType][spaceID].nodeConnections[nodeID] = nodeConnections;
				} else {
					self.cache.spaces[rootType][spaceID].nodeConnections = {
						[nodeID]: nodeConnections,
					};
				}
			} else {
				self.cache.spaces[rootType][spaceID] = {
					nodeConnections: {
						[nodeID]: nodeConnections,
					},
				};
			}
		} else {
			self.cache.spaces[rootType] = {
				[spaceID]: {
					nodeConnections: {
						[nodeID]: nodeConnections,
					},
				},
			};
		}
	}
	cacheClearSpaceNodeConnections(rootType, spaceID, nodeID) {
		const self = this;
		if (self.cache.spaces[rootType]) {
			if (self.cache.spaces[rootType][spaceID]) {
				if (self.cache.spaces[rootType][spaceID].nodeConnections) {
					if (self.cache.spaces[rootType][spaceID].nodeConnections[nodeID]) {
						delete self.cache.spaces[rootType][spaceID].nodeConnections[nodeID];
						return true;
					}
				}
			}
		}
		return false;
	}
	// AGENT APIS
	agentActiveSpaces(rootType) {
		const self = this;
		if (self.cache.agents[rootType]) {
			return self.cache.agents[rootType];
		} else {
			const agent = self.spaces[rootType];
			const activeSpaces = {
				object: agent,
				values: Object.values(agent),
				keys: Object.keys(agent),
			};
			self.cacheSetAgentSpaces(rootType, activeSpaces);
			return activeSpaces;
		}
	}
	// SPACE APIS
	spaceActiveNodes(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType] && self.cache.spaces[rootType][spaceID] && self.cache.spaces[rootType][spaceID].nodes) {
			return self.cache.spaces[rootType][spaceID].nodes;
		} else {
			const activeNodes = {};
			activeNodes.object = {};
			if (self.spaces[rootType] && self.spaces[rootType][spaceID] && self.spaces[rootType][spaceID].nodes && self.spaces[rootType][spaceID].nodes.keys) {
				self.spaces[rootType][spaceID].nodes.keys.forEach(function (id) {
					activeNodes.object[id] = self.nodes[id];
				});
			}
			activeNodes.values = Object.values(activeNodes.object);
			activeNodes.keys = Object.keys(activeNodes.object);
			self.cacheSetSpaceNodes(rootType, spaceID, activeNodes);
			return activeNodes;
		}
	}
	spaceActiveConnections(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType] && self.cache.spaces[rootType][spaceID] && self.cache.spaces[rootType][spaceID].connections) {
			return self.cache.spaces[rootType][spaceID].connections;
		} else {
			const activeConnections = {};
			activeConnections.object = {};
			if (self.spaces[rootType] && self.spaces[rootType][spaceID] && self.spaces[rootType][spaceID].connections && self.spaces[rootType][spaceID].connections.keys) {
				self.spaces[rootType][spaceID].connections.keys.forEach(function (id) {
					activeConnections.object[id] = self.connections[id];
				});
			}
			activeConnections.values = Object.values(activeConnections.object);
			activeConnections.keys = Object.keys(activeConnections.object);
			self.cacheSetSpaceConnections(rootType, spaceID, activeConnections);
			return activeConnections;
		}
	}
	/*
	spaceActiveEdges(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType] && self.cache.spaces[rootType][spaceID] && self.cache.spaces[rootType][spaceID].edges) {
			return self.cache.spaces[rootType][spaceID].edges;
		} else {
			const activeEdges = {};
			activeEdges.object = {};
			if (self.spaces[rootType] && self.spaces[rootType][spaceID] && self.spaces[rootType][spaceID].edges && self.spaces[rootType][spaceID].edges.keys) {
				self.spaces[rootType][spaceID].edges.keys.forEach(function (id) {
					activeEdges.object[id] = self.edges[id];
				});
			}
			activeEdges.values = Object.values(activeEdges.object);
			activeEdges.keys = Object.keys(activeEdges.object);
			self.cacheSetSpaceEdges(rootType, spaceID, activeEdges);
			return activeEdges;
		}
	}
	*/
	spaceActiveEdges(rootType, spaceID) {
		const self = this;
		if (self.cache.spaces[rootType] && self.cache.spaces[rootType][spaceID] && self.cache.spaces[rootType][spaceID].edges) {
			return self.cache.spaces[rootType][spaceID].edges;
		} else {
			const activeNodes = self.spaceActiveNodes(rootType, spaceID);
			const activeConnections = self.spaceActiveConnections(rootType, spaceID);
			const spaceEdges = {};
			spaceEdges.object = {};
			if (self.spaces[rootType] && self.spaces[rootType][spaceID] && self.spaces[rootType][spaceID].edges && self.spaces[rootType][spaceID].edges.keys) {
				self.spaces[rootType][spaceID].edges.keys.forEach(function (id) {
					spaceEdges.object[id] = self.edges[id];
				});
			}
			spaceEdges.values = Object.values(spaceEdges.object);
			spaceEdges.keys = Object.keys(spaceEdges.object);
			const edges = { ...spaceEdges.object };
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
			self.cacheSetSpaceEdges(rootType, spaceID, activeEdges);
			return activeEdges;
		}
	}
	spaceNodeConnections(rootType, spaceID, nodeID) {
		const self = this;
		if (
			self.cache.spaces[rootType] &&
			self.cache.spaces[rootType][spaceID] &&
			self.cache.spaces[rootType][spaceID].nodeConnections &&
			self.cache.spaces[rootType][spaceID].nodeConnections[nodeID]
		) {
			return self.cache.spaces[rootType][spaceID].nodeConnections[nodeID];
		} else {
			const connections = { ...self.spaceActiveConnections(rootType, spaceID).object };
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
			self.cacheSetSpaceNodeConnections(rootType, spaceID, nodeID, nodeConnections);
			return nodeConnections;
		}
	}
	spaceValidateRootType(rootType) {
		const self = this;
		if (!self.spaces[rootType]) {
			throw new Error(`Root type does not exist: ${rootType}`);
		}
	}
	spaceValidateSpaceID(rootType, spaceID) {
		const self = this;
		self.spaceValidateRootType(rootType);
		if (!self.spaces[rootType][spaceID]) {
			throw new Error(`Space ID does not exist: ${spaceID}`);
		}
	}
	createSpace(rootType, spaceID, space) {
		const self = this;
		//self.spaceValidateRootType(rootType);
		if (!space) {
			space = {};
		}
		if (!space.nodes) {
			space.nodes = {
				object: {},
				keys: [],
			};
		}
		if (!space.connections) {
			space.connections = {
				object: {},
				keys: [],
			};
		}
		if (!space.edges) {
			space.edges = {
				object: {},
				keys: [],
			};
		}
		if (self.spaces[rootType]) {
			if (self.spaces[rootType][spaceID]) {
				// overwrite
				self.spaces[rootType][spaceID] = space;
			} else {
				self.spaces[rootType][spaceID] = space;
			}
		} else {
			self.spaces[rootType] = {
				[spaceID]: space,
			};
		}
		self.cacheClearAgentSpaces(rootType);
		return space;
	}
	readSpace(rootType, spaceID) {
		const self = this;
		//self.spaceValidateRootType(rootType)
		//self.spaceValidateSpaceID(rootType, spaceID);
		if (self.spaces[rootType]) {
			if (self.spaces[rootType][spaceID]) {
				return self.spaces[rootType][spaceID];
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	updateSpace(rootType, spaceID, space) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		self.spaces[rootType][spaceID] = space;
		self.cacheClearAgentSpaces(rootType);
		return space;
	}
	deleteSpace(rootType, spaceID) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		delete self.spaces[rootType][spaceID];
		self.cacheClearAgentSpaces(rootType);
	}
	initializeSpaceNodes(rootType, spaceID, candidates) {
		const self = this;
		const staged = self.spaceActiveNodes(rootType, spaceID).object;
		const activeNodes = self.spaceActiveNodes(rootType, spaceID);
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
		self.updateSpaceNodes(rootType, spaceID, Object.values(staged));
		self.cacheClearSpaceNodes(rootType, spaceID);
	}
	createSpaceNodes(rootType, spaceID, nodes) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		self.createNodes(nodes);
		if (!self.spaces[rootType][spaceID].nodes) {
			self.spaces[rootType][spaceID].nodes = {
				object: {},
				keys: [],
			};
		}
		nodes.forEach(function (node) {
			self.spaces[rootType][spaceID].nodes.object[node.id] = true;
		});
		self.spaces[rootType][spaceID].nodes.keys = Object.keys(self.spaces[rootType][spaceID].nodes.object);
		// clear cache
		self.cacheClearSpaceNodes(rootType, spaceID);
		return nodes;
	}
	readSpaceNodes(rootType, spaceID, nodes) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = nodes.filter(function (node) {
			return self.spaces[rootType][spaceID].nodes.object[node.id];
		});
		const result = self.readNodes(filtered);
		return result;
	}
	updateSpaceNodes(rootType, spaceID, nodes) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = nodes.filter(function (node) {
			return self.spaces[rootType][spaceID].nodes.object[node.id];
		});
		const result = self.updateNodes(filtered);
		// clear cache
		self.cacheClearSpaceNodes(rootType, spaceID);
		return result;
	}
	deleteSpaceNodes(rootType, spaceID, nodes) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = nodes.filter(function (node) {
			return self.spaces[rootType][spaceID].nodes.object[node.id];
		});
		const result = self.deleteNodes(filtered);
		filtered.forEach(function (node) {
			delete self.spaces[rootType][spaceID].nodes.object[node.id];
		});
		self.spaces[rootType][spaceID].nodes.keys = Object.keys(self.spaces[rootType][spaceID].nodes.object);
		// clear cache
		self.cacheClearSpaceNodes(rootType, spaceID);
		return result;
	}
	createSpaceConnections(rootType, spaceID, connections) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		self.createConnections(connections);
		if (!self.spaces[rootType][spaceID].connections) {
			self.spaces[rootType][spaceID].connections = {
				object: {},
				keys: [],
			};
		}
		connections.forEach(function (connection) {
			self.spaces[rootType][spaceID].connections.object[connection.id] = true;
			self.cacheClearSpaceNodeConnections(rootType, spaceID, connection.nodeID);
		});
		self.spaces[rootType][spaceID].connections.keys = Object.keys(self.spaces[rootType][spaceID].connections.object);
		// clear cache
		self.cacheClearSpaceConnections(rootType, spaceID);
		return connections;
	}
	readSpaceConnections(rootType, spaceID, connections) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = connections.filter(function (connection) {
			return self.spaces[rootType][spaceID].connections.object[connection.id];
		});
		const result = self.readConnections(filtered);
		return result;
	}
	updateSpaceConnections(rootType, spaceID, connections) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = connections.filter(function (connection) {
			return self.spaces[rootType][spaceID].connections.object[connection.id];
		});
		filtered.forEach(function (connection) {
			self.cacheClearSpaceNodeConnections(rootType, spaceID, connection.nodeID);
		});
		const result = self.updateConnections(filtered);
		// clear cache
		self.cacheClearSpaceConnections(rootType, spaceID);
		return result;
	}
	deleteSpaceConnections(rootType, spaceID, connections) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = connections.filter(function (connection) {
			return self.spaces[rootType][spaceID].connections.object[connection.id];
		});
		const result = self.deleteConnections(filtered);
		filtered.forEach(function (connection) {
			delete self.spaces[rootType][spaceID].connections.object[connection.id];
			self.cacheClearSpaceNodeConnections(rootType, spaceID, connection.nodeID);
		});
		self.spaces[rootType][spaceID].connections.keys = Object.keys(self.spaces[rootType][spaceID].connections.object);
		// clear cache
		self.cacheClearSpaceConnections(rootType, spaceID);
		return result;
	}
	createSpaceEdges(rootType, spaceID, edges) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		self.createEdges(edges);
		if (!self.spaces[rootType][spaceID].edges) {
			self.spaces[rootType][spaceID].edges = {
				object: {},
				keys: [],
			};
		}
		edges.forEach(function (edge) {
			self.spaces[rootType][spaceID].edges.object[edge.id] = true;
		});
		self.spaces[rootType][spaceID].edges.keys = Object.keys(self.spaces[rootType][spaceID].edges.object);
		// clear cache
		self.cacheClearSpaceEdges(rootType, spaceID);
		return edges;
	}
	readSpaceEdges(rootType, spaceID, edges) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = edges.filter(function (edge) {
			return self.spaces[rootType][spaceID].edges.object[edge.id];
		});
		const result = self.readEdges(filtered);
		return result;
	}
	updateSpaceEdges(rootType, spaceID, edges) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = edges.filter(function (edge) {
			return self.spaces[rootType][spaceID].edges.object[edge.id];
		});
		const result = self.updateEdges(filtered);
		// clear cache
		self.cacheClearSpaceEdges(rootType, spaceID);
		return result;
	}
	deleteSpaceEdges(rootType, spaceID, edges) {
		const self = this;
		self.spaceValidateSpaceID(rootType, spaceID);
		const filtered = edges.filter(function (edge) {
			return self.spaces[rootType][spaceID].edges.object[edge.id];
		});
		const result = self.deleteEdges(filtered);
		filtered.forEach(function (edge) {
			delete self.spaces[rootType][spaceID].edges.object[edge.id];
		});
		self.spaces[rootType][spaceID].edges.keys = Object.keys(self.spaces[rootType][spaceID].edges.object);
		// clear cache
		self.cacheClearSpaceEdges(rootType, spaceID);
		return result;
	}
}

export default new GraphService();
