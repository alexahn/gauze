// will synchronize state between local storage and services

import * as packageJSON from "./../../../../../package.json";

function migrateGraph(services, components) {
	// fetch the freshest version and attempt a migration if necessary
	// use packageJSON to set up migration breakpoints
	// update version:graph if there is an unhandled breakpoint
	// don't delete the old version entries, in case a rollback is necessary
}

function loadGraph(services, components) {
	const { graph } = services;
	try {
		const version = localStorage.getItem("version:graph");
		const json = localStorage.getItem(`graph:${version}`);
		const parsed = JSON.parse(json);
		graph.default.nodes = graph.default.nodesFromJSON(parsed.nodes || {}, services, components);
		graph.default.connections = graph.default.connectionsFromJSON(parsed.connections || {}, services, components);
		graph.default.edges = parsed.edges || {};
		graph.default.spaces = parsed.spaces || {};
	} catch (e) {
		console.error("failed to load graph:", e);
	}
}

function storeGraph(services, components) {
	const { graph } = services;
	const version = localStorage.getItem("version:graph");
	const json = JSON.stringify({
		nodes: graph.default.nodesToJSON(graph.default.nodes),
		connections: graph.default.connectionsToJSON(graph.default.connections),
		edges: graph.default.edges,
		spaces: graph.default.spaces,
	});
	if (version) {
		localStorage.setItem(`graph:${version}`, json);
	} else {
		localStorage.setItem("version:graph", packageJSON.version);
		localStorage.setItem(`graph:${packageJSON.version}`, json);
	}
}

// todo:
// migrateModel
// loadModel
// storeModel

function start(services, components) {
	// migrate stage
	migrateGraph(services, components);
	// load stage
	loadGraph(services, components);
	const timer = setInterval(function () {
		// store stage
		storeGraph(services, components);
	}, 512);
}

export { start };
