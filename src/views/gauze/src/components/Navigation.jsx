import * as React from "react";

import Link from "./Link.jsx";

function Navigation({ pathfinder, services }) {
	const { gauze } = services;
	const proxyJWT = gauze.default.getProxyJWT();
	const systemJWT = gauze.default.getSystemJWT();
	const next = pathfinder.stateToURL("gauze.system.headers.graph", {}, {});
	const state = pathfinder.URLToState(location.href);
	const signUpClass =
		state.name === "gauze.environment.signup" ? "w3 athelas clouds ba bw1 br2 bgx4 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx4 bdx4 cx6 bgx3h bdx3h";
	const signInClass =
		state.name === "gauze.environment.signin" ? "w3 athelas clouds ba bw1 br2 bgx8 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx8 bdx8 cx6 bgx9h bdx9h";
	const signOutClass =
		state.name === "gauze.proxy.signout" ? "w4 athelas clouds ba bw1 br2 bgx2 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx2 bdx2 cx6 bgx3h bdx3h";
	const proxyClass =
		state.name === "gauze.proxy.proxies" ? "w4 athelas clouds ba bw1 br2 bgx6 bdx1 cx2 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx6 bdx6 cxyz7 bgx5h bdx5h cx6h";
	const systemClass =
		state.name === "gauze.system.headers.graph" ? "w4 athelas clouds ba bw1 br2 bgx10 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx10 bdx10 cx6 bgx8h bdx8h";

	const signUp = (
		<div>
			<Link href={pathfinder.stateToURL("gauze.environment.signup", {}, { next })} push={true}>
				<button className={signUpClass} style={{ opacity: state.name === "gauze.environment.signup" ? "0.5" : "1" }} disabled={state.name === "gauze.environment.signup"}>
					Sign Up
				</button>
			</Link>
		</div>
	);
	const signIn = (
		<div>
			<Link href={pathfinder.stateToURL("gauze.environment.signin", {}, { next })} push={true}>
				<button className={signInClass} style={{ opacity: state.name === "gauze.environment.signin" ? "0.5" : "1" }} disabled={state.name === "gauze.environment.signin"}>
					Sign In
				</button>
			</Link>
		</div>
	);
	const signOut = (
		<div>
			<Link href={pathfinder.stateToURL("gauze.proxy.signout", {}, { next })} push={true}>
				<button className={signOutClass} style={{ opacity: state.name === "gauze.proxy.signout" ? "0.5" : "1" }} disabled={state.name === "gauze.proxy.signout"}>
					Sign Out
				</button>
			</Link>
		</div>
	);
	const proxy = (
		<div>
			<Link href={pathfinder.stateToURL("gauze.proxy.proxies", {}, { next })} push={true}>
				<button className={proxyClass} style={{ opacity: state.name === "gauze.proxy.proxies" ? "0.5" : "1" }} disabled={state.name === "gauze.proxy.proxies"}>
					Proxy
				</button>
			</Link>
		</div>
	);
	const system = (
		<div>
			<Link href={pathfinder.stateToURL("gauze.system.headers.graph", {}, {})} push={true}>
				<button className={systemClass} style={{ opacity: state.name === "gauze.system.headers.graph" ? "0.5" : "1" }} disabled={state.name === "gauze.system.headers.graph"}>
					System
				</button>
			</Link>
		</div>
	);
	return (
		<div className="flex">
			{proxyJWT ? null : signUp}
			{proxyJWT ? null : signIn}
			{proxyJWT ? signOut : null}
			{proxyJWT ? proxy : null}
			{systemJWT ? system : null}
		</div>
	);
}

export default Navigation;
