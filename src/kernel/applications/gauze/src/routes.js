import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

const routes = [
	{
		name: "environment",
		path: "/y",
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
				return gauze.default
					.enterSession(null)
					.then(function (session) {
						console.log("session created!", session);
						const attributes = session.data.environment.enter_session;
						model.default.create("SESSION", attributes.gauze__session__id, attributes);
						gauze.jwt = attributes.gauze__session__value;
						return Promise.resolve(true);
					})
					.catch(function (err) {
						console.log("SOMETHING WENT WRONG", err);
						throw err;
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
		name: "system",
		path: "/x",
		canActivate: (router, dependencies) => (toState, fromState, done) => {
			console.log("can activate called", dependencies);
			const { store } = dependencies;
			const state = store.getState();
			console.log("state", state);
			return true;
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
