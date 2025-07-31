import * as React from "react";

function Navigation({ pathfinder, services }) {
	console.log("pathfinder", pathfinder);
	const { gauze } = services;
	const proxyJWT = gauze.default.getProxyJWT();
	const systemJWT = gauze.default.getSystemJWT();
	const next = pathfinder.stateToURL("project.system.system_root", {}, {});
	return (
		<ul>
			<li>{proxyJWT ? <div>project.environment.signup</div> : <a href={pathfinder.stateToURL("project.environment.signup", {}, { next })}>project.environment.signup</a>}</li>
			<li>{proxyJWT ? <div>project.environment.signin</div> : <a href={pathfinder.stateToURL("project.environment.signin", {}, { next })}>project.environment.signin</a>}</li>
			<li>{proxyJWT ? <a href={pathfinder.stateToURL("project.proxy.signout", {}, { next })}>project.proxy.signout</a> : <div>project.proxy.signout</div>}</li>
			<li>
				<a href={pathfinder.stateToURL("project.system.system_root", {}, {})}>project.system.system_root</a>
			</li>
		</ul>
	);
}

export default Navigation;
