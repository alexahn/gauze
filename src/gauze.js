export default {
	name: "gauze",
	type: "project",
	version: "0.0.1",
	realms: ["./kernel", "./database", "./system", "./environment"],
	process_middlewares: [],
	http_middlewares: [],
	development: {
		admins: [
			{
				name: "Alex Ahn",
				email: "contact@alexahn.com",
				gauze__agent_root: null,
				gauze__agent_account: null,
				gauze__agent_user: "60850dda-0340-49d1-a378-f7313ada2eee x",
				gauze__agent_person: null,
				gauze__agent_character: null,
			},
		],
	},
	staging: {
		admins: [],
	},
	production: {
		admins: [],
	},
};
