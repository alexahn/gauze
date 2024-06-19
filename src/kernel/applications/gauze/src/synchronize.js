// will synchronize state between local storage and services

import * as packageJSON from "./../../../../../package.json";

function migrateGraph(services, components) {
	// fetch the freshest version and attempt a migration if necessary
	// use packageJSON to set up migration breakpoints
	// update version:graph if there is an unhandled breakpoint
	// don't delete the old version entries, in case a rollback is necessary
}

function loadGraph(services, components) {
	const { gauze, model, router, graph } = services;
	try {
		const version = localStorage.getItem("version:graph");
		const json = localStorage.getItem(`graph:${version}`);
		const parsed = JSON.parse(json);
		graph.default.nodes = graph.default.nodesFromJSON(parsed.nodes || {}, services, components);
		graph.default.connections = graph.default.connectionsFromJSON(parsed.connections || {}, services, components);
		graph.default.edges = parsed.edges || {};
		graph.default.spaces = parsed.spaces || {};

		// clear cache so we get an instant update
		const route = router.default.getState();
		if (route && route.params && route.params.space) {
			graph.default.cacheClearSpaceNodes(gauze.default.getSystemAgentHeader(model.default).name, route.params.space);
		}
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
	let timer = setInterval(function () {
		// store stage
		storeGraph(services, components);
	}, 512);

	window.addEventListener("focus", function (e) {
		if (timer) {
			loadGraph(services, components);
		} else {
			loadGraph(services, components);
			timer = setInterval(function () {
				storeGraph(services, components);
			}, 512);
		}
	});

	window.addEventListener("blur", function (e) {
		if (timer) {
			storeGraph(services, components);
			timer = clearInterval(timer);
		} else {
			storeGraph(services, components);
		}
	});

	/*
	// note: this cannot handle switching between active windows
	document.addEventListener('visibilitychange', function () {
		console.log('document.visibilityState', document.visibilityState)
		if (document.visibilityState === 'visible') {
			loadGraph(services, components)
		}
	})
	*/
}

export { start };
