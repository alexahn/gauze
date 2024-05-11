import * as layouts from "./layouts/index.js";
import * as sections from "./sections/index.js";
import * as units from "./units/index.js";

const routes = [
	{
		name: "root",
		path: "/",
		onActivate: function (params) {
			console.log("ROOT ACTIVATE", params);
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "users",
		path: "/users",
		onActivate: function (params) {
			console.log("USERS ACTIVATE", params);
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "users.id",
		path: "/:id",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "users.id.home",
		path: "/home",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "users.view",
		path: "/view",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "users.list",
		path: "/list",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.test.default,
	},
	{
		name: "system",
		path: "/system",
		onActivate: function (params) {
			return Promise.resolve(true);
		},
		layout: layouts.test2.default,
	},
];

export default routes;
