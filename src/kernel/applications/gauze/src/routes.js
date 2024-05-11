import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

const routes = [
	{
		name: "root",
		path: "/",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "users",
		path: "/users",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "users.id",
		path: "/:id",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "users.id.home",
		path: "/home",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "users.view",
		path: "/view",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "users.list",
		path: "/list",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.alligator.default,
		sections: {
			top: sections.alder.default,
			bottom: sections.almond.default,
		},
		units: {
			header: units.amber.default,
			body: units.amethyst.default,
		},
	},
	{
		name: "system",
		path: "/system",
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
