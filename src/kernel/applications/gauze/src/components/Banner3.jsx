import React from "react";
import { useState } from "react";

export default function Banner({ route, gauze, model, router }) {
	// conditional links based on auth state
	const environmentSessions = model.environmentSessions();
	const proxySessions = model.proxySessions();
	const systemSessions = model.systemSessions();
	const environmentJWT = gauze.getEnvironmentJWT();
	const proxyJWT = gauze.getProxyJWT();
	const systemJWT = gauze.getSystemJWT();
	const authEnvironment = environmentSessions.length || environmentJWT;
	const authProxy = proxySessions.length || proxyJWT;
	const authSystem = systemSessions.length || systemJWT;
	const signOutClass = route.name === "environment.signout" ? "w4 athelas clouds ba bw1 br2 bgx2 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx2 bdx2 cx6 bgx3h bdx3h";
	const signUpClass = route.name === "environment.signup" ? "w3 athelas clouds ba bw1 br2 bgx4 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx4 bdx4 cx6 bgx3h bdx3h";
	const proxyClass = route.name === "environment.proxy" ? "w4 athelas clouds ba bw1 br2 bgx6 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx6 bdx6 cxyz7 bgx5h bdx5h cx6h";
	const signInClass = route.name === "environment.signin" ? "w3 athelas clouds ba bw1 br2 bgx8 bdx1 cxyz6 b--dotted f6" : "f6 w3 athelas clouds ba bw1 br2 bgx8 bdx8 cx6 bgx9h bdx9h";
	const systemClass = route.name == "system.root" ? "w4 athelas clouds ba bw1 br2 bgx10 bdx1 cxyz6 b--dotted f6" : "f6 w4 athelas clouds ba bw1 br2 bgx10 bdx10 cx6 bgx8h bdx8h";
	const signUp = (
		<div>
			<a href={router.buildUrl("environment.signup", {})}>
				<button className={signUpClass} style={{ opacity: route.name === "environment.signup" ? "0.5" : "1" }} disabled={route.name === "environment.signup"}>
					Sign Up
				</button>
			</a>
		</div>
	);
	const signIn = (
		<div>
			<a href={router.buildUrl("environment.signin", {})}>
				<button className={signInClass} style={{ opacity: route.name === "environment.signin" ? "0.5" : "1" }} disabled={route.name === "environment.signin"}>
					Sign In
				</button>
			</a>
		</div>
	);
	const signOut = (
		<div>
			<a href={router.buildUrl("environment.signout", {})}>
				<button className={signOutClass} style={{ opacity: route.name === "environment.signin" ? "0.5" : "1" }} disabled={route.name === "environment.signout"}>
					Sign Out
				</button>
			</a>
		</div>
	);
	const proxy = (
		<div>
			<a href={router.buildUrl("proxy.agents", {})}>
				<button className={proxyClass} style={{ opacity: route.name === "proxy.agent" ? "0.5" : "1" }} disabled={route.name === "proxy.agent"}>
					Proxy
				</button>
			</a>
		</div>
	);
	const system = (
		<div>
			<a href={router.buildUrl("system.root", {})}>
				<button className={systemClass} style={{ opacity: route.name === "system.root" ? "0.5" : "1" }} disabled={route.name === "system.root"}>
					System
				</button>
			</a>
		</div>
	);
	const root = (
		<div>
			<a href={router.buildUrl("system.root", {})}>Root</a>
		</div>
	);
	return (
		<div>
			{/*<h1 className="athelas f1"><div className="cx2">G</div><div className="cx4">A</div><div className="cx6">U</div><div className="cx8">Z</div><div className="cx10">E</div></h1>*/}
			<h1 className="athelas f1" align="center">
				<div className="flex" align="center">
					<div className="cx2">G</div>
					<div className="cx4">A</div>
					<div className="cx6">U</div>
					<div className="cx8">Z</div>
					<div className="cx10">E</div>
				</div>
			</h1>
			<div className="flex">
				{authProxy || authSystem ? signOut : null}
				{!(authProxy || authSystem) ? signUp : null}
				{authProxy ? proxy : null}
				{!(authProxy || authSystem) ? signIn : null}
				{authSystem ? system : null}
			</div>
		</div>
	);
}
