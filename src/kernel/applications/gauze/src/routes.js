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
			const environmentSessions = model.default.environmentSessions();
			if (environmentSessions && environmentSessions.length) {
				return Promise.resolve(true);
			} else {
				return gauze.default.enterSession(null).then(function (session) {
					model.default.create("SESSION", session.gauze__session__id, session);
					gauze.default.setEnvironmentJWT(session.gauze__session__value);
					return Promise.resolve(true);
				});
			}
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.azurite.default,
			},
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
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.amethyst.default,
			},
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
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.amber.default,
			},
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
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.ammonite.default,
			},
		},
	},
	{
		name: "proxy",
		path: "/y",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { model } = services;
			const proxySessions = model.default.proxySessions();
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
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.azurite.default,
			},
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
			top: sections.alder.default,
			bottom: sections.alder.default,
		},
		units: {
			top: {
				body: units.adamite.default,
			},
			bottom: {
				body: units.azurite.default,
			},
		},
	},
	{
		name: "system",
		path: "/x",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			const { services } = dependencies;
			const { model } = services;
			const systemSessions = model.default.systemSessions();
			if (systemSessions && systemSessions.length) {
				return true;
			} else {
				const proxySessions = model.default.proxySessions();
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
			right: sections.alder.default,
		},
		units: {
			left: {
				body: units.adamite.default,
			},
			right: {
				body: units.azurite.default,
			},
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
			left: {
				body: units.adamite.default,
			},
			right: {
				header: units.azurite.default,
				body: units.azurite.default,
			},
		},
	},
];

export default routes;
