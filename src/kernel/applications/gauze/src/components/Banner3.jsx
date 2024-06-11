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
			{!(authProxy || authSystem) ? signIn : null}
			{!(authProxy || authSystem) ? signUp : null}
			{authProxy || authSystem ? signOut : null}
			{authProxy ? proxy : null}
			{authSystem ? system : null}
			{authSystem ? root : null}
		</div>
	);
}
