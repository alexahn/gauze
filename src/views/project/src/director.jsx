import * as React from "react";

import { Director } from "./router.js";

function createDirector(context) {
	const { root, layouts, components, pathfinder } = context;

	const director = new Director();

	/*
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
	*/

	director.register("project.environment.signup", function (context, dependencies, pathParams, searchParams) {
		console.log("project.environment.signup rendered");
		const { services } = context;
		const { next } = searchParams;
		root.render(
			<React.StrictMode>
				<layouts.azurite.default>
					<div>
						<components.logo.default header={true} clouds={true} />
						<components.navigation.default pathfinder={pathfinder} services={services} />
					</div>
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
					<div>
						<components.logo.default header={true} clouds={true} />
						<components.navigation.default pathfinder={pathfinder} services={services} />
					</div>
					<components.signin.default pathfinder={pathfinder} services={services} next={next} />
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
					<div>
						<components.logo.default header={true} clouds={true} />
						<components.navigation.default pathfinder={pathfinder} services={services} />
					</div>
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
					<div>
						<components.logo.default header={true} clouds={true} />
						<components.navigation.default pathfinder={pathfinder} services={services} />
					</div>
					<components.signout.default pathfinder={pathfinder} services={services} next={next} />
				</layouts.azurite.default>
			</React.StrictMode>,
		);
	});

	director.register("project.system.headers", function (context, dependencies, pathParams, searchParams) {
		console.log("project.system.headers rendered");
		const { services } = context;
		const { headers } = dependencies;
		root.render(
			<React.StrictMode>
				<layouts.amethyst.default>
					<div className="pa2">
						<components.logo.default header={false} clouds={false} />
						{/*<components.navigation.default pathfinder={pathfinder} services={services} />*/}
					</div>
					<div className="pl2 pr2 pb2">
						<components.headers.default headers={headers.headers} />
					</div>
				</layouts.amethyst.default>
			</React.StrictMode>,
		);
	});

	return director;
}

export { createDirector };
