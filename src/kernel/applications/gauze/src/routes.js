import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

const routes = [
	{
		name: "environment",
		path: "/z",
		onActivate: function ({ dependencies }) {
			const { services } = dependencies;
			const { gauze, model } = services;
			const sessions = model.default.all("SESSION");
			const anonymous = sessions.filter(function (session) {
				return session.gauze__session__agent_id === null && session.gauze__session__agent_type === null;
			});
			if (anonymous && anonymous.length) {
				console.log("anonymous session found!", anonymous);
				return Promise.resolve(true);
			} else {
				return gauze.default.enterSession(null).then(function (session) {
					console.log("session created!", session);
					model.default.create("SESSION", session.gauze__session__id, session);
					gauze.default.setEnvironmentJWT(session.gauze__session__value);
					return Promise.resolve(true);
				});
				// do graphql query and make a session
				// save the session to the model service
				// proceed
			}
			//return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.azurite.default,
		},
	},
	{
		name: "environment.signup",
		path: "/signup",
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.amethyst.default,
		},
	},
	{
		name: "environment.signin",
		path: "/signin",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.amber.default,
		},
	},
	{
		name: "environment.signout",
		path: "/signout",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.ammonite.default,
		},
	},
	{
		name: "proxy",
		path: "/y",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const proxySessions = services.model.default.all("SESSION").filter(function (session) {
				return session.gauze__session__agent_type === "gauze__proxy";
			});
			console.log("proxy can activate", proxySessions);
			if (proxySessions && proxySessions.length) {
				return true;
			} else {
				return Promise.reject({ redirect: { name: "environment.signin" } });
			}
		},
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.ammonite.default,
		},
	},
	{
		name: "proxy.agents",
		path: "/agents",
		onActivate: function ({ dependencies }) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			main: sections.alder.default,
		},
		units: {
			body: units.ammonite.default,
		},
	},
	{
		name: "system",
		path: "/x",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const systemSessions = services.model.default.all("SESSION").filter(function (session) {
				return session.gauze__session__realm === "system";
			});
			console.log("system can activate", systemSessions);
			if (systemSessions && systemSessions.length) {
				return true;
			} else {
				const proxySessions = services.model.default.all("SESSION").filter(function (session) {
					return session.gauze__session__agent_type === "gauze__proxy";
				});
				if (proxySessions && proxySessions.length) {
					return Promise.reject({ redirect: { name: "proxy.agents" } });
				} else {
					return Promise.reject({ redirect: { name: "environment.signin" } });
				}
			}
		},
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.alder.default,
			right: sections.almond.default,
		},
		units: {
			header: units.azurite.default,
			body: units.azurite.default,
		},
	},
	{
		name: "system.types",
		path: "/types",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.anaconda.default,
		sections: {
			left: sections.alder.default,
			right: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
];

export default routes;
