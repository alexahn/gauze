import React from "react";
import { useState } from "react";

export default function Banner({ gauze, model, router }) {
	// conditional links based on auth state
	const systemSessions = model.systemSessions();
	const proxySessions = model.proxySessions();
	const environmentSessions = model.environmentSessions();
	const authenticated = systemSessions.length || proxySessions.length;
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
			{!authenticated ? signIn : null}
			{!authenticated ? signUp : null}
			{authenticated ? signOut : null}
			{authenticated ? proxy : null}
			{authenticated ? system : null}
		</div>
	);
}
