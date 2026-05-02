import * as React from "react";

import { Director } from "@ahn/sinew";

function createDirector(context) {
	const { root, layouts, components, pathfinder } = context;

	const director = new Director();

	function handleRenderError(error, errorInfo) {
		console.error("RENDER ERROR", error, errorInfo);
	}

	function renderPage(name, children) {
		root.render(
			<React.StrictMode>
				<components.error_boundary.default resetKey={name} pathfinder={pathfinder} onError={handleRenderError}>
					{children}
				</components.error_boundary.default>
			</React.StrictMode>,
		);
	}

	director.register("project.error", function (context, dependencies, pathParams, searchParams) {
		const { error } = dependencies;
		renderPage(
			"project.error",
			<layouts.amethyst.default>
				<components.error.default error={error.error} pathfinder={pathfinder} source={error.source} />
			</layouts.amethyst.default>,
		);
	});

	director.register("project.environment.signup", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { next } = searchParams;
		renderPage(
			"project.environment.signup",
			<layouts.azurite.default>
				<div>
					<components.logo.default header={true} clouds={true} />
					<components.navigation.default pathfinder={pathfinder} services={services} />
				</div>
				<components.signup.default pathfinder={pathfinder} services={services} next={next} />
			</layouts.azurite.default>,
		);
	});

	director.register("project.environment.signin", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { next } = searchParams;
		renderPage(
			"project.environment.signin",
			<layouts.azurite.default>
				<div>
					<components.logo.default header={true} clouds={true} />
					<components.navigation.default pathfinder={pathfinder} services={services} />
				</div>
				<components.signin.default pathfinder={pathfinder} services={services} next={next} />
			</layouts.azurite.default>,
		);
	});

	director.register("project.proxy.proxies", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { next } = searchParams;
		const proxies = dependencies.proxies.proxies;
		renderPage(
			"project.proxy.proxies",
			<layouts.azurite.default>
				<div>
					<components.logo.default header={true} clouds={true} />
					<components.navigation.default pathfinder={pathfinder} services={services} />
				</div>
				<components.proxies.default pathfinder={pathfinder} services={services} proxies={proxies} next={next} />
			</layouts.azurite.default>,
		);
	});

	director.register("project.proxy.signout", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { next } = searchParams;
		renderPage(
			"project.proxy.signout",
			<layouts.azurite.default>
				<div>
					<components.logo.default header={true} clouds={true} />
					<components.navigation.default pathfinder={pathfinder} services={services} />
				</div>
				<components.signout.default pathfinder={pathfinder} services={services} next={next} />
			</layouts.azurite.default>,
		);
	});

	director.register("project.system.headers", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { headers } = dependencies;
		renderPage(
			"project.system.headers",
			<layouts.amethyst.default>
				<div className="pa2">
					<components.logo.default header={false} clouds={false} />
				</div>
				<div className="pl2 pr2 pb2">
					<components.headers.default pathfinder={pathfinder} headers={headers.headers} />
				</div>
			</layouts.amethyst.default>,
		);
	});

	director.register("project.system.headers.graph", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { system, headers } = dependencies;
		const { agent } = system;
		renderPage(
			"project.system.headers.graph",
			<layouts.amethyst.default>
				<components.graph.default pathfinder={pathfinder} services={services} agent={agent} headers={headers.headers} />
			</layouts.amethyst.default>,
		);
	});

	director.register("project.system.headers.header.list", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { system, headers, header, list } = dependencies;
		const { agent } = system;
		const { items, count, pageInfo } = list;
		const variables = JSON.parse(searchParams.variables);
		renderPage(
			"project.system.headers.header.list",
			<layouts.amethyst.default>
				<div className="pa2">
					<components.logo.default header={false} clouds={false} />
				</div>
				<div className="pl2 pr2 pb2 flex">
					<components.headers.default pathfinder={pathfinder} headers={headers.headers} />
					<components.table.default
						pathfinder={pathfinder}
						services={services}
						agent={agent}
						headers={headers.headers}
						header={header.header}
						variables={variables}
						items={items}
						count={count}
						pageInfo={pageInfo}
					/>
				</div>
			</layouts.amethyst.default>,
		);
	});

	director.register("project.system.headers.header.create", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { headers, header, create } = dependencies;
		const variables = JSON.parse(searchParams.variables);
		renderPage(
			"project.system.headers.header.create",
			<layouts.amethyst.default>
				<div className="pa2">
					<components.logo.default header={false} clouds={false} />
				</div>
				<div className="pl2 pr2 pb2 flex">
					<components.headers.default pathfinder={pathfinder} headers={headers.headers} />
					<components.item.default pathfinder={pathfinder} services={services} header={header.header} item={undefined} mode={"create"} variables={variables} />
				</div>
			</layouts.amethyst.default>,
		);
	});

	director.register("project.system.headers.header.item", function (context, dependencies, pathParams, searchParams) {
		const { services } = context;
		const { headers, header, item } = dependencies;
		renderPage(
			"project.system.headers.header.item",
			<layouts.amethyst.default>
				<div className="pa2">
					<components.logo.default header={false} clouds={false} />
				</div>
				<div className="pl2 pr2 pb2 flex">
					<components.headers.default pathfinder={pathfinder} headers={headers.headers} />
					<components.item.default pathfinder={pathfinder} services={services} header={header.header} item={item.item} mode={"update"} />
				</div>
			</layouts.amethyst.default>,
		);
	});

	return director;
}

export { createDirector };
