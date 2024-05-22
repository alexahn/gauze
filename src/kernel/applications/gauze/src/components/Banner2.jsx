import React from "react";
import { useState } from "react";

export default function Banner2({ gauze, model, router }) {
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
	const signUp = (
		<div>
			<a href={router.buildUrl("environment.signup", {})}>Sign Up</a>
		</div>
	);
	const signIn = (
		<div>
			<a href={router.buildUrl("environment.signin", {})}>Sign In</a>
		</div>
	);
	const signOut = (
		<div className="w3 pl1">
			<a href={router.buildUrl("environment.signout", {})}>Sign Out</a>
		</div>
	);
	const proxy = (
		<div className="w3 pl1">
			<a href={router.buildUrl("proxy.agents", {})}>Proxy</a>
		</div>
	);
	return (
		<div className="flex cf w-100 h-100 items-center ba pa1">
			<div className="flex fl w-100 justify-center">
				<div className="f3">
					<b>Gauze</b>
				</div>
			</div>
			<div className="flex fr items-center">
				{authProxy ? proxy : null}
				{!(authProxy || authSystem) ? signIn : null}
				{!(authProxy || authSystem) ? signUp : null}
				{authProxy || authSystem ? signOut : null}
			</div>
		</div>
	);
}
