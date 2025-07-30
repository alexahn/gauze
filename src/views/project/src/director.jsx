import * as React from "react";

import { Director } from "./router.js";

function createDirector(context) {
	const { root, layouts, components, pathfinder } = context

	const director = new Director()

	director.register("project.root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.root rendered");
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.environment.environment_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.environment_root rendered");
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} />
					<div>Environment</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.environment.signin", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.signin rendered");
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} />
					<components.signin.default />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.proxy.proxy_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.proxy.proxy_root rendered");
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} />
					<div>Proxy</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.system.system_root", function (context, dependencies, pathParams, searchParams) {
		console.log("project.system.system_root rendered");
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<components.navigation.default pathfinder={pathfinder} />
					<div>System</div>
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	return director
}

export {
	createDirector
}
