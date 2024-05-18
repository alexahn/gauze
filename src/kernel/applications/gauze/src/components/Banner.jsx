import React from "react";
import { useState } from "react";

export default function Banner({ gauze, model, router }) {
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
		<div>
			<a href={router.buildUrl("environment.signout", {})}>Sign Out</a>
		</div>
	);
	const proxy = (
		<div>
			<a href={router.buildUrl("proxy.agents", {})}>Proxy</a>
		</div>
	);
	const system = (
		<div>
			<a href={router.buildUrl("system.types", {})}>System</a>
		</div>
	);
	return (
		<div>
			<h1>Gauze</h1>
			{!(authProxy || authSystem) ? signIn : null}
			{!(authProxy || authSystem) ? signUp : null}
			{authProxy || authSystem ? signOut : null}
			{authProxy ? proxy : null}
			{authSystem ? system : null}
		</div>
	);
}
