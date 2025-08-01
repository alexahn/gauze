import * as React from "react";

function Navigation({ pathfinder, services }) {
	console.log("pathfinder", pathfinder);
	const { gauze } = services;
	const proxyJWT = gauze.default.getProxyJWT();
	const systemJWT = gauze.default.getSystemJWT();
	const next = pathfinder.stateToURL("project.system.system_root", {}, {});
	const state = pathfinder.URLToState(location.href)
    const signUpClass = state.name === "project.environment.signup" ? "w3 athelas clouds ba bw1 br2 bgx4 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx4 bdx4 cx6 bgx3h bdx3h";
    const signInClass = state.name === "project.environment.signin" ? "w3 athelas clouds ba bw1 br2 bgx8 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx8 bdx8 cx6 bgx9h bdx9h";
    const signOutClass = state.name === "project.environment.signout" ? "w4 athelas clouds ba bw1 br2 bgx2 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx2 bdx2 cx6 bgx3h bdx3h";
    const proxyClass = state.name === "project.proxy.proxies" ? "w4 athelas clouds ba bw1 br2 bgx6 bdx1 cx2 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx6 bdx6 cxyz7 bgx5h bdx5h cx6h";
    const systemClass = state.name == "project.system.system_root" ? "w4 athelas clouds ba bw1 br2 bgx10 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx10 bdx10 cx6 bgx8h bdx8h";

    const signUp = (
        <div>
            <a href={pathfinder.stateToURL("project.environment.signup", {}, { next })}>
                <button className={signUpClass} style={{ opacity: state.name === "project.environment.signup" ? "0.5" : "1" }} disabled={state.name === "project.environment.signup"}>
                    Sign Up
                </button>
            </a>
        </div>
    );
    const signIn = (
        <div>
            <a href={pathfinder.stateToURL("project.environment.signin", {}, { next })}>
                <button className={signInClass} style={{ opacity: state.name === "project.environment.signin" ? "0.5" : "1" }} disabled={state.name === "project.environment.signin"}>
                    Sign In
                </button>
            </a>
        </div>
    );
    const signOut = (
        <div>
            <a href={pathfinder.stateToURL("project.proxy.signout", {}, { next })}>
                <button className={signOutClass} style={{ opacity: state.name === "project.proxy.signout" ? "0.5" : "1" }} disabled={state.name === "project.proxy.signout"}>
                    Sign Out
                </button>
            </a>
        </div>
    );
    const proxy = (
        <div>
            <a href={pathfinder.stateToURL("project.proxy.proxies", {}, { next })}>
                <button className={proxyClass} style={{ opacity: state.name === "project.proxy.proxies" ? "0.5" : "1" }} disabled={state.name === "project.proxy.proxies"}>
                    Proxy
                </button>
            </a>
        </div>
    );
    const system = (
        <div>
            <a href={pathfinder.stateToURL("project.system.system_root", {}, {})}>
                <button className={systemClass} style={{ opacity: state.name === "project.system.system_root" ? "0.5" : "1" }} disabled={state.name === "project.system.system_root"}>
                    System
                </button>
            </a>
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
	)
}

export default Navigation;
