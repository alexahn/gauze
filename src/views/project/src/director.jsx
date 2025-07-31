import * as React from "react";

import { Director } from "./router.js";

function createDirector(context) {
	const { root, layouts, components, pathfinder } = context;

	const director = new Director();

	director.register("project.root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.root rendered");
		const { services } = context;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.environment.environment_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.environment_root rendered");
		const { services } = context;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<div>Environment</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.environment.signup", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.signup rendered");
		const { services } = context;
		const { next } = searchParams;
		//const next = pathfinder.stateToURL("project.system.system_root", {}, {})
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<components.signup.default pathfinder={pathfinder} services={services} next={next} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.environment.signin", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.signin rendered");
		const { services } = context;
		const { next } = searchParams;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<components.signin.default pathfinder={pathfinder} services={services} next={next} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.proxy.proxy_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.proxy.proxy_root rendered");
		const { services } = context;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<div>Proxy</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.proxy.proxies", function (context, dependencies, pathParams, searchParams) {
		console.log("project.proxy.proxies rendered");
		const { services } = context;
		const { next } = searchParams;
		const proxies = dependencies.proxies.proxies;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<components.proxies.default pathfinder={pathfinder} services={services} proxies={proxies} next={next} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.proxy.signout", function (context, dependencies, pathParams, searchParams) {
		console.log("project.proxy.signout rendered");
		const { services } = context;
		const { next } = searchParams;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<components.signout.default pathfinder={pathfinder} services={services} next={next} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.system.system_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.system.system_root rendered");
		const { services } = context;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} services={services} />
					<div>System</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	return director;
}

export { createDirector };
