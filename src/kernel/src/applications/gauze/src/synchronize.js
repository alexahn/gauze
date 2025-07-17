// will synchronize state between local storage and services

// todo: pass in a package path from process.env
import * as packageJSON from "./../../../../../../package.json";

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
		graph.default.clearCache();
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

function migrateModel(services, components) {}

function loadModel(services, components) {
	const { gauze, model, router, graph } = services;
	try {
		const version = localStorage.getItem("version:model");
		const json = localStorage.getItem(`model:${version}`);
		const parsed = JSON.parse(json);
		model.default.index = parsed.index;
		model.default.collection = parsed.collection;
	} catch (e) {
		console.error("failed to load model:", e);
	}
}

function storeModel(services, components) {
	const { model } = services;
	const version = localStorage.getItem("version:model");
	const json = JSON.stringify({
		index: model.default.index,
		collection: model.default.collection,
	});
	if (version) {
		localStorage.setItem(`model:${version}`, json);
	} else {
		localStorage.setItem("version:model", packageJSON.version);
		localStorage.setItem(`model:${packageJSON.version}`, json);
	}
}

function migrate(services, components) {
	migrateGraph(services, components);
	migrateModel(services, components);
}

function load(services, components) {
	loadGraph(services, components);
	loadModel(services, components);
}

function store(services, components) {
	storeGraph(services, components);
	storeModel(services, components);
}

function start(services, components) {
	// migrate stage
	migrate(services, components);
	// load stage
	load(services, components);
	let timer = setInterval(function () {
		// store stage
		store(services, components);
	}, 512);

	window.addEventListener("focus", function (e) {
		if (timer) {
			load(services, components);
		} else {
			load(services, components);
			timer = setInterval(function () {
				store(services, components);
			}, 512);
		}
	});

	window.addEventListener("blur", function (e) {
		if (timer) {
			store(services, components);
			timer = clearInterval(timer);
		} else {
			store(services, components);
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
